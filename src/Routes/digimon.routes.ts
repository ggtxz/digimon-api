import express from 'express';
import * as digimonController  from '../Controllers/digimon.controller';

const router = express.Router();
digimonController.popularDigimon();

/**
 * @swagger
 * /digimon:
 *   get:
 *     summary: Retorna todos os Digimons
 *     responses:
 *       200:
 *         description: Lista de Digimons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   img:
 *                     type: string
 *                   level:
 *                     type: string
 */

router.get('/', digimonController.getDigimons);

/**
 * @swagger
 * /digimon/nome/{digiName}:
 *   get:
 *     summary: Retorna os digimons que contenham os caracteres pesquisados no nome
 *     parameters:
 *       - in: path
 *         name: digiName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do Digimon
 *     responses:
 *       200:
 *         description: Digimon encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 img:
 *                   type: string
 *                 level:
 *                   type: string
 */

router.get('/nome/:digiName', digimonController.getDigimonByName);

/**
 * @swagger
 * /digimon/level/{digiLevel}:
 *   get:
 *     summary: Retorna um Digimon pelo level (case sensitive)
 *     parameters:
 *       - in: path
 *         name: digiLevel
 *         required: true
 *         schema:
 *           type: string
 *         description: Level do Digimon
 *     responses:
 *       200:
 *         description: Digimon encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 img:
 *                   type: string
 *                 level:
 *                   type: string
 */

router.get('/level/:digiLevel', digimonController.getDigimonByLevel);

/**
 * @swagger
 * /digimon/{digiLevel}/{digiName}:
 *   get:
 *     summary: Retorna um Digimon que esteja no level escrito (case sensitive) e que contenha os caracteres pesquisados no nome
 *     parameters:
 *       - in: path
 *         name: digiLevel
 *         required: true
 *         schema:
 *           type: string
 *         description: Level do Digimon
 *       - in: path
 *         name: digiName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do Digimon
 *     responses:
 *       200:
 *         description: Digimon encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 img:
 *                   type: string
 *                 level:
 *                   type: string
 */

router.get('/:digiLevel/:digiName', digimonController.getDigimonByLevelAndName);

export default router;