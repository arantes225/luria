# Tarefas — piloto ECG

Estados: `a fazer`, `em andamento`, `bloqueada`, `concluída com evidência`. Escolha uma tarefa por branch/PR quando houver código. Atualize evidência e responsável ao assumir.

| ID | Estado | Tarefa / critério de conclusão | Dependência |
| --- | --- | --- | --- |
| E-01 | a fazer | Conferir execuções do workflow PhysioNet e inventário do R2 privado; registrar contagens, versões e verificação de checksums sem expor caminhos sensíveis. | Acesso autorizado a Actions/R2. |
| E-02 | a fazer | Localizar notebook(s) Colab e relatórios já existentes; registrar resultados auditáveis segundo [status.md](status.md), com revisão/hashes. | Acesso do proprietário e sanitização. |
| E-03 | a fazer | Definir e testar digitalização de sinal: calibração, escala, recorte, rastreamento e erro por derivação. | Dados de referência licenciados e protocolo de avaliação. |
| E-04 | a fazer | Validar scanner e retorno da câmera em celular real, incluindo baixa luz, rotação e permissão negada; comparar o [PR #168](https://github.com/arantes225/luria/pull/168) com a correção já mesclada no [#169](https://github.com/arantes225/luria/pull/169). | Aparelho e revisão visual. |
| E-05 | a fazer | Revisar separação entre estudo, Work e benchmark; definir controles de acesso, retenção e custo para testes futuros. | Arquitetura e revisão de segurança. |
| E-06 | bloqueada | Planejar uso com pacientes e eventual regulação. | Evidência técnica, validação clínica, privacidade, jurídico e responsável médico. |
