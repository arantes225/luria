# Inventário e preparação editorial LURIA

Esta entrega documenta 225 núcleos temáticos, correspondências candidatas, fila de produção e cinco planos experimentais. **Não contém cinco apostilas científicas completas nem HTML aprovado.**

- [Relatório do inventário](entrega-editorial/RELATORIO_INVENTARIO.md)
- [Inventário estruturado](entrega-editorial/inventario-225.json)
- [Fila de produção](entrega-editorial/fila-producao.json)
- [Preparação do piloto](entrega-editorial/piloto/README.md)
- [Checkpoint](entrega-editorial/checkpoint.json)

## Reprodução

Na raiz do repositório, com Node.js:

```sh
node docs/editorial/luria-225/inventariar-luria.cjs
node docs/editorial/luria-225/preparar-piloto.cjs
node docs/editorial/luria-225/verificar-entrega.cjs
```

O inventário regenera relatórios de triagem a partir dos arquivos locais. Preserve versões anteriores antes de atualizar o retrato documental. O preparador do piloto recusa substituir arquivos divergentes, para proteger futuras redações. O verificador confere IDs, fila, limites de lote/grupo e hashes dos cadernos em relação ao inventário salvo; diferenças futuras nos cadernos exigem atualizar o inventário conscientemente.

Os scripts escrevem apenas nesta pasta documental. Não habilitam correspondências no catálogo, não produzem HTML, não aprovam imagens e não alteram o banco. Contagem de caracteres e sintaxe não certificam cobertura ou qualidade clínica. Referências privadas do Drive não são incluídas nesta entrega.
