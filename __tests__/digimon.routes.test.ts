import request from 'supertest';
import app from '../src/app';

describe('Testes das rotas Digimon', () => {
  // Teste para verificar a rota que retorna todos digimons
  it('Deve retornar todos os Digimons', async () => {
    const response = await request(app).get('/digimon');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  // Teste para verificar a rota que retorna os digimons que contenha "Agumon" no nome
  it('Deve retornar um Digimon pelo nome', async () => {
    const response = await request(app).get('/digimon/nome/Agumon');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    if (response.body.data.length > 0) {
      expect(response.body.data[0].name).toBe('Agumon');
    }
  });

  // Teste para verificar a rota que retorna os digimons que esteja no level "In Training"
  it('Deve retornar um Digimon pelo level', async () => {
    const response = await request(app).get('/digimon/level/In%20Training');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    if (response.body.data.length > 0) {
      expect(response.body.data[0].level).toBe('In Training');
    }
  });

  // Teste para verificar a rota que retorna os digimons que esteja no level "In Training" e que contenha "Agumon" no nome
  it('Deve retornar um Digimon pelo nome e level', async () => {
    const response = await request(app).get('/digimon/In%20Training/Agumon');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    if (response.body.data.length > 0) {
      expect(response.body.data[0].level).toBe('In Training');
      expect(response.body.data[0].name).toBe('Pagumon');
    }
  });
});