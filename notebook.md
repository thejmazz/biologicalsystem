# Notebook

## 2015/12/18

* Ported content from student wiki to GitHub
* Took notes on tasks of assignment
* Read into the [OBO 1.2 format][obo-format]

Mused with the idea of using [GraphQL][GraphQL] for an API that produces
ontologies. Imagine this:

```
{
  ontology(id: "GO:0000001") {
    id,
    name,
    namespace,
    def,
    synonym,
    is_a
  }
}
```

which could return JSON like this:

```json
{
  "ontology": {
    "id": "GO:0000001",
    "name": "mitochondrion inheritance",
    "namespace": "biological_process",
    "def": "'The distribution of mitochondria, including the mitochondrial genome, into daughter cells after mitosis or meiosis, mediated by interactions between mitochondria and the cytoskeleton.' [GOC:mcc, PMID:10873824, PMID:11389764]",
    "synonym": "'mitochondrial inheritance' EXACT []",
    "is_a": [
      "GO:0048308 ! organelle inheritance",
      "GO:0048311 ! mitochondrion distribution"
    ]
  }
}
```

The advantage being here that this only requires **one server endpoint** and
**one request** for composited data. The query determines what is returned.
Consider the "legacy" technique:
`api.com/endpoint/ontology/GO:0000001?name=t&def=t` or a similar POST body. This
requires extensive modification and implementation  server-side to handle all
these cases. Furthermore, the query could be expanded to include other data
formats. Imagine a large scale "BioGraphQL" project backed by NCBI, ENSEMBLE,
PDB, *etc.* We could have every bio database accessible from a single API, using
a descriptive query language! Each data type could get its own "namespace",
`ontology`, or `pdb` for example. Relations between data types could be strictly
defined. Issue: how to organize/fund the unification of all these databases and
organizations.

In the context of this project, it would be nice to have GraphQL queries to
retrieve relationships between ontologies, genes associated with an ontology,
properties of those genes such as CTD, PDB xrefs, *etc.* See the [GraphQL
Working Draft][graphql-draft] for specifics.

[obo-format]: http://oboformat.googlecode.com/svn/trunk/doc/GO.format.obo-1_2.html
[GraphQL]: http://graphql.org
[graphql-draft]: http://facebook.github.io/graphql/

**Plans for next day**

As tempting as it is to code new tools (QuickGO could be a bit more
interactive...would be nice to expand out children/details within the same DAG
view), I should get on with using what's available and garnering some data. At
this point I have one root term: [mitochondrion localization][GO:0051646]. Thus,
I will  attempt to define a group of genes responsible for (getting) the
mitochondria (where they need to be) - are they already there? Do we just want
to maintain their current position? Ultimately I'd like to answer all those
questions with curated gene sets. If "mitochondria" as a whole becomes too
unwieldy, I will limit to a defined subsystem, perhaps one of the three children
of our root:

* [GO:0051659][GO:0051659] (maintenance of mitochondrion localization)
* [GO:0051654][GO:0051654] (establishment of mitochondrion localization)
* [GO:0048311][GO:0048311] (mitochondrion distribution)

So, tomorrow I plan on going through each of these terms and their children (9
total), and finding (5-10?) representative genes for each term. Human when
possible.

[GO:0051646]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0051646
[GO:0051659]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0051659
[GO:0051654]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0051654
[GO:0048311]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0048311

**Readings**

* [Localization of mitochondria in living cells with rhodamine 123](http://www.pnas.org/content/77/2/990.full.pdf)
* [Miro1 Is a Calcium Sensor for Glutamate Receptor-Dependent Localization of Mitochondria at Synapses](http://www.sciencedirect.com/science/article/pii/S0896627309001202)

## 2015/12/19

Did readings. Started working on
[bionode-obo](https://github.com/thejmazz/bionode-obo).

### Localization of mitochondria in living cells with rhodamine

This paper from 1979 described a new technique to isolate the visualization
of mitochondrion in a variety of cell types using rhodamin 123.

* mitochondria are plastic, mobile, and express morphological heterogeneity
* morphology influence by metabolic state, cell cycle, development,
  differentiation, pathological states
* movement can be observed in a 15-30s timeframe
* varying morphologies:
  * large, globular in rat cardiac muscle
  * filamentous radiating from perinuclear in marsupial kidney
  * interconnecting network in mouse 3T6 cell
* colchicine distorts shape and dist. of mitochondria, "probably by affecting
  the depolymerization of microtubules"
* crossbridges observed b/w microtubules and mitochondria

### Miro1 Is a Calcium Sensor for Glutamate Receptor-Dependent Localization of Mitochondria at Synapses

This paper explored the biochemical processes observed during ion fluctuation
in neurons.

* Miro: Mitochondial Rho GTPase
* mitochondrial trafficking regulated by Ca2+ entry
* Miro1 **links** mitochondria to KIF5 **motor proteins**
  * linkage inhibited by Ca2+ binding to Miro1's EF domains
* "Miro1 is a key determinant of how energy supply is matched to energy use in
  neurons"
* mitochondria need to be close to sites of ion fluxes since most brain ATP
  generated by mitochondria
* "Mutations in proteins regulating mitochondrial dynamics compromise synaptic
  function and plasticity"
* trafficking mediated by kinesins
* syntabulin and syntaphilin proposed as linking machineray
* GTPases Drp1, OPA1, Mitofusins regulate dist. of neuronal mitochondria
* Miro has TM domain locating them to outer mitochondrial membrane, two
  GTPase domains, two Ca2+ sensing EF hand domains protruding into cytoplasm
* "calcium influx ... causes mitochondria to accumulate at synapses in a
  Miro1-dependent manner"
* changing Miro1 expressions does not change speed of moving mitochondria
* EF hand domain mutant facilitated mitochondrial movement to same extent as WT
* Milton in *drosophilia* has mitochondria binding site, closest homolog
  GRIF-1/TRAK2
* syntabullin, RanBP2
* **functional role** during neuronal activity: locate mitochondrion near
  postsynaptic membrane where they are needed to provide calcium buffering and
  to provide ATP to pump out ions that enter through synaptic channels


## 2015/12/20

Continued some work on bionode-obo parser. Studying for linear algebra exam.

## 2015/19/21

More studying and exam.


## 2015/19/22

* went through notebook, notes on papers
