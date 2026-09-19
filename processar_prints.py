#!/usr/bin/env python3
"""
Script para processar prints e inserir nos documentos
Execute quando tiver adicionado prints em ./prints/Ux/figNN.png
"""

import os
import zipfile
import shutil
from pathlib import Path
import xml.etree.ElementTree as ET

def inserir_imagem_no_docx(docx_path, num_print, img_path):
    """Insere imagem no Word, substituindo [COLAR AQUI O PRINT N]"""
    
    if not os.path.exists(img_path):
        print(f"  ✗ Arquivo não encontrado: {img_path}")
        return False
    
    print(f"  Inserindo fig{num_print:02d}...")
    
    temp_dir = f"temp_docx_{num_print}"
    
    try:
        # Extrai
        with zipfile.ZipFile(docx_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)
        
        # Copia imagem
        media_dir = f"{temp_dir}/word/media"
        os.makedirs(media_dir, exist_ok=True)
        img_filename = f"image{num_print}.png"
        shutil.copy(img_path, os.path.join(media_dir, img_filename))
        
        # Remove referência ao print do XML
        doc_xml = f"{temp_dir}/word/document.xml"
        with open(doc_xml, 'r', encoding='utf-8') as f:
            conteudo = f.read()
        
        conteudo = conteudo.replace(f'[COLAR AQUI O PRINT {num_print}]', '')
        
        with open(doc_xml, 'w', encoding='utf-8') as f:
            f.write(conteudo)
        
        # Reempacota
        with zipfile.ZipFile(docx_path, 'w', zipfile.ZIP_DEFLATED) as zip_ref:
            for root, dirs, files in os.walk(temp_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, temp_dir)
                    zip_ref.write(file_path, arcname)
        
        print(f"    ✓ fig{num_print:02d} inserida")
        return True
        
    except Exception as e:
        print(f"    ✗ Erro: {e}")
        return False
    finally:
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)

def processar_todos_prints():
    """Processa todos os prints disponíveis"""
    
    mapeamento = {
        'U1': ('Relatorio_U1_A3_Modelos_de_Implantacao_CloudSim.docx', 8),
        'U2': ('Relatorio_U2_A4_Gerenciamento_de_Dados_MySQL_InfinityFree.docx', 5),
        'U3': ('Relatorio_U3_A3_Migracao_de_Aplicacao_Google_Drive.docx', 8),
        'U4': ('Relatorio_U4_A3_Seguranca_e_Privacidade_SSL_InfinityFree.docx', 8),
    }
    
    print("\n" + "="*60)
    print("PROCESSANDO PRINTS")
    print("="*60 + "\n")
    
    total_inseridas = 0
    
    for unit, (docx_file, total) in mapeamento.items():
        print(f"{unit}: {docx_file}")
        
        for fig_num in range(1, total + 1):
            img_path = f"./prints/{unit}/fig{fig_num:02d}.png"
            
            if os.path.exists(img_path):
                if inserir_imagem_no_docx(docx_file, fig_num, img_path):
                    total_inseridas += 1
            else:
                print(f"  ⏳ fig{fig_num:02d}.png - aguardando")
        
        print()
    
    print("="*60)
    print(f"✓ {total_inseridas} imagens inseridas com sucesso!")
    print("="*60 + "\n")

if __name__ == "__main__":
    processar_todos_prints()

