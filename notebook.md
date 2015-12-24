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

![miro1](img/miro1.png)


## 2015/12/20

Continued some work on bionode-obo parser. Studying for linear algebra exam.

## 2015/19/21

More studying and exam.


## 2015/19/22

* went through notebook, notes on papers
* observed QuickGO "protein annotation tab". Can't handle not working
  programmatically - thankfully QuickGO provides
  [REST web services][quickgo-rest]
* Made [bionode-quickgo][bionode-quickgo] to scratch my itch. Can now use
  QuickGO API with semantic ease through a Promise or Stream
* Small gasket pipeline which gets tsv of a given go term from quickgo, converts
  it to csv
* gasket pipeline imports and exports from dat
* exported dataset gets filtered by protein ids, 347 results down to 304 proteins
* these 33 extra results seem to be all from proteins with more than one ref, most
have 2, some have 3
* sorting by number of refs, I retrieved `Q7TSA0`, `Q8BG51`, and `Q8BG51` as the
top three for [GO:0047497][GO:0047497]. I also notice the first two letters of
each ID appear to form a "prefix" of sorts - perhaps it best to filter by these
as well.

### [GO:0047497][[GO:0047497]] mitochondrion transport along microtubule

**Mitochondrial Rho GTPase 2**

* *mus musculus*
  * [Q8BG51](http://www.uniprot.org/uniprot/Q8BG51)
    * Rhot1
  * [Q8JZN7](http://www.uniprot.org/uniprot/Q8JZN7)
    * Rhot2

* [Q7TSA0](http://www.uniprot.org/uniprot/Q7TSA0)
  * *rattus norvegicus*
  * Rhot2

* [H0YZL5](http://www.uniprot.org/uniprot/H0YZL5)
  * uncharactized protein
  * RHOT2

[quickgo-rest]: http://www.ebi.ac.uk/QuickGO/WebServices.html
[bionode-quickgo]: https://github.com/thejmazz/bionode-quickgo

## 2015/19/23

* Observed that the first 20 or so, when checking manually by copy pasting
from an array of IDs arranged by most-refs to least-refs, where all the
Rot2 gene (with the exception of Rot1 also present in *mus musculus*)
* They are all the same gene!(?)
* So, using the Uniprot URI "api" and [xml2js][xml2js] and [hihat][hihat] I
began inspecting from where to retrieve the "name" attribute:

![hihat01](img/hihat.png)

[xml2js]: https://www.npmjs.com/package/xml2js
[hihat]: https://www.npmjs.com/package/hihat

* finally got xml parsing pipeline to output "name" of gene. Would be nice
to post-process the xmlJSON output to convert single-length arrays to
their object..was frustrating parsing this data

```js
xmlJSON.uniprot.entry[0].gene[0].name[0]._
```

* Among the names I see RHOT2, KIF1B, MAP1B, MAPT, Miro, RHOT1, ... just
need to remove duplicates
* filters into arrays by gene name. but pipe ends here and need to refactor
into smaller pipeables
* sorts by size of array:

![filtered-sorted](img/filtered-sorted.png)


[GO:0051646]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0051646
[GO:0051659]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0051659
[GO:1990456]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:1990456
[GO:0051654]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0051654
[GO:1990456]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:1990456
[GO:0034643]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0034643
[GO:0034640]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0034640
[GO:0047497]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0047497
[GO:0090146]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0090146
[GO:0090147]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0090147
[GO:0048311]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0048311
[GO:0048312]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0048312
[GO:0000001]: http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0000001

Generated [markdown files](https://github.com/thejmazz/biologicalsystem/tree/master/files) by running
gasket pipeline with different GO IDs.

Some GO terms have no protein annotations!

Noted down "popular genes" from each markdown dump.

### [GO:0047497][GO:0047497] (mitochondrion transport along microtubule)

**Rhot2**

Mitochondrial Rho GTPase 2

Human: [Q8IXI1](http://www.uniprot.org/uniprot/Q8IXI1)

* Mitochondrial GTPase involved in mitochondrial trafficking. Probably involved
  in control of anterograde transport of mitochondria and their subcellular
  distribution (By similarity).
* 3 NT binding domains, then 2 calcium binding domains, then 3 NT binding domains
* 2 pubs. supporting subcellular location of
  * mitochondrion outer membrane
  * single-pass type IV membrane protein
* InInteracts with the kinesin-binding proteins TRAK1/OIP106 and TRAK2/GRIF1,
  forming a link between mitochondria and the trafficking apparatus of the
  microtubules (by similarity) [UNIPROT]
* Probably involved in control of anterograde transport of mitochondria and
  their subcellular distribution (By similarity) [STRING]

[rhot2-string](http://string-db.org/newstring_cgi/show_network_section.pl?identifier=9606.ENSP00000321971)

![rhot2-string](img/rhot2-string.png)

**Rhot1**

Human: [Q8IXI2](http://www.uniprot.org/uniprot/Q8IXI2)

* colocalizes with MGARP and RHOT2 at the mitochondria

![rhot1-string](img/rhot1-string.png)

**MAPT**

Microtubule-associated protein tau

Human: [P10636](http://www.uniprot.org/uniprot/P10636)

* Promotes microtubule assembly and stability, and might be involved in the establishment and maintenance of neuronal polarity. The C-terminus binds axonal microtubules while the N-terminus binds neural plasma membrane components, suggesting that tau functions as a linker protein between both. Axonal polarity is predetermined by TAU/MAPT localization (in the neuronal cell) in the domain of the cell body defined by the centrosome. The short isoforms allow plasticity of the cytoskeleton whereas the longer isoforms may preferentially play a role in its stabilization. [UNIPROT]
* in a lot of biological processes
* cytosol, cell membrane, cytoskeleton
* Interacts with PSMC2 through SQSTM1 (By similarity). Interacts with SQSTM1 when polyubiquitinated. Interacts with FKBP4 (By similarity). Binds to CSNK1D. Interacts with SGK1. Interacts with EPM2A; the interaction dephosphorylates MAPT at Ser-396. [UNIPROT]

![mapt-string](img/mapt-string.png)

**MAP1B**

Microtubule-associated protein 1B

Human: [P46821](http://www.uniprot.org/uniprot/P46821)

* Facilitates tyrosination of alpha-tubulin in **neuronal** microtubules (By similarity). Phosphorylated MAP1B may play a role in the cytoskeletal changes that accompany neurite extension. Possibly MAP1B binds to at least two tubulin subunits in the polymer, and this bridging of subunits might be involved in nucleating microtubule polymerization and in stabilizing microtubules. Acts as a positive cofactor in DAPK1-mediated autophagic vesicle formation and membrane blebbing [UNIPROT]
* cytoplasm, cytoskeleton, synapse, dendritic spine
* 3 different light chains, LC1, LC2 and LC3, can associate with MAP1A and MAP1B proteins. LC1 interacts with the amino-terminal region of MAP1B. Interacts with ANP32A and TIAM2. Interacts with the tubulin tyrosine TTL (By similarity). Interacts (via C-terminus) with GAN (via Kelch domains). Interacts (via N-terminus) with DAPK1. Interacts with TMEM185A. Interacts with MAP1LC3B

![map1b-string](img/map1b-string.png)

**KIF1B**

Kinesin-like protein

* Motor for anterograde transport of mitochondria. Has a microtubule plus end-directed motility. Isoform 2 is required for induction of neuronal apoptosis [UNIPROT]
* ctyoplasmic vesicle, cytoskeleton, mitochondrion
* Colocalizes with synaptophysin at synaptic cytoplasmic transport vesicles in the neurites of hippocampal neurons
* Interacts (via C-terminus end of the kinesin-motor domain) with CHP1; the interaction occurs in a calcium-dependent manner (By similarity). Interacts with KBP

![kif1b-string](img/kif1b-string.png)
