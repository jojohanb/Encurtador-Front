import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
    <div>
      <h1>Encurtador de Links</h1>
      <p>Transforme links longos em URLs curtas e fáceis de compartilhar</p>
    </div>
    <div>
      <label htmlFor=""> Legenda do link *</label>
      <input type="text" placeholder='Ex:Meu portfólio, Site da empresa...'/>
      <div>
        <label htmlFor="">URL para encurtar*</label>
        <input type="text" placeholder='https://exemplo.com/sua-url-muito-longa...' />
        <button>Encurtar</button>
      </div>
    </div>
    <div>
      <div>
        <h2>Meus Links</h2>
        <p>link</p>
      </div>
      <div>
        <h4>Exame Seleção Técnico 2026</h4>
        <a href="https://utfpr-cm.notion.site/encurtador-url">https://utfpr-cm.notion.site/encurtador-url</a>
        <p>https://utfpr-cm.notion.site/encurtador-url</p>
        <p>Criado em 01/10/2025, 09:06</p>
      </div>
      <button>Copiar</button>
    </div>
    
    </>
  )
}

export default App
