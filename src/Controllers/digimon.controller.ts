import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

const prisma = new PrismaClient();
const URL_BASE = 'https://digimon-api.vercel.app/api/digimon';

// Interface para definir as propriedades de digimon
interface Digimon{
    name: string;
    img: string;
    level: string;
}

/*
Essa função verifica se o banco já está populado com digimons toda vez que o server é iniciado.
Caso o banco esteja vazio ele irá buscar os digimons da API e inseri-los no banco de dados.
Caso o banco já esteja populado ele não faz nada.
Além disso verifica se não está em ambiente de testes
*/
export async function popularDigimon(): Promise<void> {
    try {
        const digimonCount = await prisma.digimon.count();
        if (digimonCount > 0) {
            if (process.env.NODE_ENV !== 'test') {
                console.log("O banco de dados já está populado com digimons.");
            }
            return;
        }

        const response: AxiosResponse<Digimon[]> = await axios.get(URL_BASE);
        const digimons: Digimon[] = response.data;

        const createPromises = digimons.map(digimon =>
            prisma.digimon.create({
                data: digimon
            })
        );

        await Promise.all(createPromises);
        if (process.env.NODE_ENV !== 'test') {
            console.log("Banco de dados populado com sucesso com os digimons.");
        }

    } catch (err) {
        console.error('Erro ao povoar os digimons:', err);
    }
}

// Essa rota obtem todos os digimons
export const getDigimons = async (req: Request, res: Response): Promise<void> => {
    try {
        const digimons = await prisma.digimon.findMany();
        res.status(200).json({
            data: digimons,
            msg: "Digimons retornados com sucesso"
        });
    } catch (err) {
        console.error('Erro ao buscar Digimons:', err);
        res.status(500).json({ error: 'Erro ao buscar Digimons' });
    }
};

// Essa rota obtém todos os digimons que contenha o valor passado no parâmetro no nome
export const getDigimonByName = async (req: Request, res: Response): Promise<void> => {
    try{
        const search = req.params.digiName;

        const digimons = await prisma.digimon.findMany({
            where: {
                name: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
        })

        if(digimons.length > 0){
            res.status(200).json({
                data: digimons,
                msg: "Digimons retornados com sucesso"
            });
        }

        else{
            res.status(200).json({
                msg: `Nenhum digimon que contenha '${search}' no nome foi encontrado`
            });
        }
    }
    catch(err){
        console.error('Erro ao buscar Digimons:', err);
        res.status(500).json({ error: 'Erro ao buscar Digimons' });
    }
}

/*
Para não ficar igual a rota de nomes eu fiz a rota de levels sensível,
pensando que são opções limitadas de level, no front poderia ser uma lista de levels para 
o usuário selecionar, então o front mandaria o nome exato do level.
*/
export const getDigimonByLevel = async (req: Request, res: Response): Promise<void> => {
    try{
        let level = req.params.digiLevel

        // Tratamento caso In Training venha sem espaço
        if(level == "InTraining"){
            level = 'In Training'
        }

        const digimons = await prisma.digimon.findMany({
            where: {
                level: {
                    contains: level,
                },
            },
        })

        if(digimons.length > 0){
            res.status(200).json({
                data: digimons,
                msg: "Digimons retornados com sucesso"
            });
        }

        else{
            res.status(200).json({
                msg: `Nenhum digimon com o level '${level}' foi encontrado, tente uma dessas opções: Fresh, In Training (In Training, InTraining ou In%20Training), Rookie, Champion, Ultimate, Mega, Armor Lembre-se de respeitar as letras maiúsculas e minúsculas`
            });
        }
    }
    catch(err){
        console.error('Erro ao buscar Digimons:', err);
        res.status(500).json({ error: 'Erro ao buscar Digimons' });
    }
}

/*
Essa rota contém pede o level (que deve ser informado de forma correta) e o nome
Ela vai retornar todos os digimons que contenham os caracteres pesquisados no nome
e que estejam no level selecionado
*/
export const getDigimonByLevelAndName = async (req: Request, res: Response): Promise<void> => {
    try{
        const name = req.params.digiName
        let level = req.params.digiLevel

        // Tratamento caso In Training venha sem espaço
        if(level == "InTraining"){
            level = 'In Training'
        }

        const digimons = await prisma.digimon.findMany({
            where: {
                AND: {
                    level: level,
                    name: {
                        contains: name,
                        mode: 'insensitive',
                    }
                     
                },
            },
        })

        if(digimons.length > 0){
            res.status(200).json({
                data: digimons,
                msg: "Digimons retornados com sucesso"
            });
        }

        else{
            res.status(200).json({
                msg: `Nenhum digimon com o level '${level}' e nome que contenha '${name}' foi encontrado, tente uma dessas opções: Fresh, In Training (In Training, InTraining ou In%20Training), Rookie, Champion, Ultimate, Mega, Armor Lembre-se de respeitar as letras maiúsculas e minúsculas`
            });
        }
    }
    catch(err){
        console.error('Erro ao buscar Digimons:', err);
        res.status(500).json({ error: 'Erro ao buscar Digimons' });
    }    
}
