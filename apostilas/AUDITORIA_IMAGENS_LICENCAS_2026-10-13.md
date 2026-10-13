# Auditoria de imagens — licenças pendentes (13/10/2026)

Esta auditoria distingue **imagem aprovada para revisão editorial** de **autorização para republicação**. Não presume licença apenas porque a imagem foi publicada online ou disponibilizada no PMC.

| ID no Supabase | Apostila | Figura | Referência conhecida | Pendência / próximo passo |
|---|---|---|---|---|
| 94 | Amniorrexe prematura | Fluxograma de conduta | Passei Direto | Autoria, atualização clínica e licença de reprodução não demonstradas. Elaborar algoritmo original LURIA validado por diretrizes. |
| 96 | Amniorrexe prematura | Teste de cristalização | Eu Médico Residente | Licença de reprodução não demonstrada. Procurar fotografia real com licença explícita. |
| 98 | Amniorrexe prematura | Histologia de corioamnionite | PMC4774647 | Verificar licença específica da figura antes de redistribuir; acesso a artigo não basta. |
| 78 | Climatério e menopausa | Esquema KNDy | Nature Reviews Endocrinology | Autorização para reutilização não comprovada. Substituir por esquema original. |
| 315 | Sangramento uterino anormal | Pólipo endometrial à histeroscopia | Hysteroscopy Newsletter | Solicitar autorização ou usar exame de licença compatível. |
| 319 | Sangramento uterino anormal | MAV uterina ao Doppler | SAGE / Journal of Endovascular Therapy | Direitos de reprodução não comprovados. Solicitar autorização ou substituir. |

**Estado técnico:** a tentativa de atualizar diretamente os registros de exibição foi bloqueada pela segurança da ferramenta. Não declarar as imagens desativadas. Não alterar status de aprovação sem deliberação autorizada. Revisar no Admin antes de reutilizar comercialmente.

**Processo recomendado:** (1) encontrar fonte e licença por imagem; (2) verificar autoria e termos de uso comercial e adaptações WebP; (3) conferir correspondência clínica entre figura, legenda e diagnóstico; (4) substituir por arquivo de uso autorizado ou criar esquema autoral quando apropriado; (5) verificar destino no capítulo, CSP, carregamento e layout em desktop e PWA.

**Referência comparativa de conteúdo:** o registro `REGISTRO_COMPARATIVOS_DRIVE.md` continua indicando comparação incompleta da RPM. Nenhuma revisão científica integral desta apostila é afirmada por este relatório.


## Implementação efetiva em 13/10/2026

- Identificadores **78, 94, 315 e 319**: não renderizados nas apostilas, sem cartões substitutos ou aviso de prévia; manter pendência de substituição por exame equivalente licenciado.
- ID **96**: substituição por `Positive Fern Test.jpg`, fotomicrografia real de teste de cristalização amniótica, Paul_012, Wikimedia Commons, licença CC BY-SA 2.0.
- ID **98**: substituição por `Histopathology of acute choriodeciduitis (original).jpg`, Mikael Häggström, MD, CC0. Legenda distingue explicitamente coriodeciduite de funisite.
- Climatério: fluxo conceitual de fogacho/KNDy criado como texto estruturado original na seção de fisiopatologia.
- RPM: fluxo clínico por segurança materno-fetal/idade gestacional estruturado originalmente na apostila.

**Limite:** foram excluídas da renderização, não excluídos os objetos históricos do Storage. Os registros originais e o histórico de revisão permanecem no banco. Não afirmar que todos os previews de todas as apostilas foram visualmente testados em navegador.
