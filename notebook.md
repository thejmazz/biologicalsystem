# Notebook

## 2015/12/18

* Ported content from student wiki to GitHub
* Took notes on tasks of assignment
* Read into the [OBO 1.2 format][obo-format]

Mused with the idea of using [GraphQL][GraphQL] for an API that produces
ontologies, imagine this:

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
