# FireSense 

<p align="center">
  <img src="./public/fotolp.png" alt="FireSense" width="400">
</p>

FireSense é uma plataforma de **monitoramento climático inteligente** focada em **agricultura**.  
O sistema calcula o **risco de queimadas** baseado em dados climáticos em tempo real e, quando o risco atinge níveis críticos, aciona automaticamente o sistema de irrigação.

🚀 **Funcionalidades principais**:
- Cadastro de propriedades agrícolas (terrenos);
- Consulta climática em tempo real via OpenWeather;
- Cálculo automático do risco de queimadas;
- Acionamento inteligente de irrigação via ESP32;
- Painel administrativo para monitoramento dos dados.

## 🚀 Como rodar o projeto localmente

### 1. Clonar o repositório

```bash
git clone <link-do-seu-repositorio>
cd FireSense
```

### 2. Instalar as dependências

```bash

composer install

npm install
```

### 3. Criar o arquivo `.env`

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

### 4. Gerar a chave da aplicação

```bash
php artisan key:generate
```

### 5. Configurar API Key do OpenWeather

O FireSense utiliza a API da OpenWeather para obter informações climáticas.

1. Crie uma conta em [OpenWeather](https://home.openweathermap.org/users/sign_up);
2. Gere uma API Key;
3. Atualize o arquivo `.env` com sua API Key:

```env
OPENWEATHER_API_KEY=sua_chave_aqui
```

⚠️ **Importante**: Sem a API Key válida, o sistema não conseguirá buscar os dados meteorológicos.

### 6. Rodar as migrations e seeders

```bash

php artisan migrate

php artisan db:seed
```

### 7. Rodar o projeto

```bash

php artisan serve

npm run dev
```

## 🛠️ Tecnologias utilizadas

- Laravel (PHP 8+)
- React (Inertia.js + Vite)
- TailwindCSS + Material UI
- Axios (para comunicação com APIs externas)
- SQLite (banco de dados local)


