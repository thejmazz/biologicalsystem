#!/bin/bash

export rDir="resources"

if [ ! -d "$rDir"  ]; then
    mkdir $rDir
fi

# gene_association.goa_human.gz
curl ftp://ftp.ebi.ac.uk/pub/databases/GO/goa/HUMAN/gene_association.goa_human.gz | gunzip > $rDir/gene_association.goa_human

# go-basic.obo
curl http://geneontology.org/ontology/go-basic.obo > $rDir/go-basic.obo

# SyRO.obo
curl https://raw.githubusercontent.com/hyginn/SyRO/master/SyRO.obo > $rDir/SyRO.obo
