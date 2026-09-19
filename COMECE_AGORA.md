# 🚀 COMECE AQUI - INSTRUÇÕES PASSO A PASSO

## ⭐ RECOMENDAÇÃO: Comece com U3 (Google Drive)

Por quê?
- Não precisa instalar nada
- Pode fazer em 15 minutos
- Sem dependências externas
- Depois você pode fazer U1 em paralelo

---

## 📱 U3 - Google Drive (8 figuras) - COMECE POR AQUI

### O que você precisa capturar:

```
Fig 1: Tela inicial do Google Drive (pasta vazia ou com pastas)
Fig 2: Menu "Novo" do Google Drive (clique no + Novo)
Fig 3: Documento criado no Google Docs (documento aberto)
Fig 4: Pasta e subpastas no Drive (criadas para organizar)
Fig 5: Janela de compartilhamento (compartilhar um arquivo)
Fig 6: Planilha com edição simultânea (Google Sheets aberto)
Fig 7: Formulário criado no Google Forms (form aberto)
Fig 8: Respostas coletadas no Google Sheets (respostas do form)
```

### Como fazer:

1. Acesse https://drive.google.com (use sua conta pessoal)
2. Crie uma pasta chamada "Trabalho_U3"
3. Dentro dela, crie:
   - Um documento Google Docs chamado "Documento_Teste"
   - Uma planilha Google Sheets chamada "Planilha_Teste"
   - Um formulário Google Forms chamado "Formulario_Teste"
4. Capture 8 screenshots conforme lista acima
5. Salve em: `/home/u/Documentos/kl/prints/U3/`
   - fig01.png
   - fig02.png
   - fig03.png
   - fig04.png
   - fig05.png
   - fig06.png
   - fig07.png
   - fig08.png

### Como salvar screenshot:
- **Windows/Mac**: Print Screen → Colar em Paint/Preview → Salvar como PNG
- **Linux**: gnome-screenshot, Flameshot, ou PrintScreen

---

## 🖥️ U1 - NetBeans/CloudSim (8 figuras) - PRÓXIMO

### O que você precisa capturar:

```
Fig 1: NetBeans instalado e em execução
Fig 2: Página de download do JDK (java.sun.com ou similar)
Fig 3: Página do CloudSim (github.com/Cloudsimplus/CloudSim)
Fig 4: Criação do projeto "Redes" no NetBeans
Fig 5: Exemplo CloudSimExample1.java no projeto
Fig 6: Pasta C:\JAVA com os arquivos descompactados
Fig 7: Biblioteca do projeto com o JAR do CloudSim
Fig 8: Saída da execução do CloudSimExample1
```

### Como fazer:

1. Baixe JDK 8+ (java.com)
2. Baixe NetBeans (netbeans.org)
3. Instale ambos
4. Baixe CloudSim (github.com/Cloudsimplus/CloudSim)
5. Descompacte em C:\JAVA
6. Crie projeto em NetBeans
7. Adicione CloudSim como biblioteca
8. Capture 8 screenshots
9. Salve em: `/home/u/Documentos/kl/prints/U1/`
   - fig01.png até fig08.png

---

## 💾 U2 - InfinityFree MySQL (5 figuras)

### O que você precisa fazer:

1. Acesse https://www.infinityfree.com/
2. Crie conta com email
3. Confirme email
4. No painel, crie banco MySQL chamado `super_techyny`
5. Capture 5 screenshots:
   - Fig 1: Página de cadastro (formulário preenchido)
   - Fig 2: Painel de controle (conta criada)
   - Fig 3: Criação do banco de dados MySQL
   - Fig 4: phpMyAdmin com script SQL executado
   - Fig 5: Tabelas criadas no banco

### Ação minha:

Quando você confirmar que a conta está pronta:
- Eu automatizo o phpMyAdmin com Playwright
- Executo o script `./relatorios/script_banco_super_techyny.sql`
- Valido as 7 tabelas criadas

---

## 🔒 U4 - InfinityFree SSL (8 figuras)

### O que você precisa fazer:

1. Acesse https://www.infinityfree.com/
2. Crie nova conta com email diferente
3. Confirme email
4. Crie subdomínio (ex: `klaus-super-techyny.epizy.com`)
5. Capture screenshots conforme pronto

### Ação minha:

Quando você confirmar que conta + subdomínio estão prontos:
- Eu automatizo com Playwright:
  1. Solicitar ordem do certificado SSL
  2. Cadastrar registro CNAME
  3. Instalar certificado
  4. Editar .htaccess com redirecionamento HTTPS
  5. Testar acesso HTTPS

---

## ✅ Checklist

- [ ] Começou com U3 (Google Drive)?
- [ ] Capturou 8 figuras de U3?
- [ ] Salvou em `./prints/U3/fig01.png` até `fig08.png`?
- [ ] Começou com U1 (NetBeans)?
- [ ] Criou conta InfinityFree para U2?
- [ ] Criou conta InfinityFree para U4 + subdomínio?

---

## 📞 Quando terminar

Diga: **"Tenho os prints de U1"** ou **"U3 pronto"** ou **"Conta InfinityFree criada"**

Então eu:
1. Executo `python3 processar_prints.py`
2. Automatizo phpMyAdmin e SSL
3. Converto para PDF
4. Gero relatório final

---

**Bom trabalho! 🚀**
