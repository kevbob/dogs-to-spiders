function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{
    // Fix some misspellings
    v = v.replace(/\bDog(s)?\b/g, "Spider$1");
    v = v.replace(/\bdog(s)?\b/g, "spider$1");
    v = v.replace(/\bDoggy?\b/g, "Spider");
    v = v.replace(/\bdoggy?\b/g, "spider");
    v = v.replace(/\bfour-legged?\b/g, "eight-legged");
    v = v.replace(/\b(C|c)anine?\b/g, "$1anine");
    v = v.replace(/\bbark?\b/g, "hiss");
    v = v.replace(/\bBark?\b/g, "Hiss");
    v = v.replace(/\btail(s)?\b/g, "abdomen$1");
    v = v.replace(/\bTail(s)?\b/g, "Abdomen$1");
    v = v.replace(/\btounge?\b/g, "pedipalps");
    v = v.replace(/\b(G|g)reat (D|d)ane\b/g, "tarantula");
    v = v.replace(/\bchihuahua\b/g, "black widow");
    v = v.replace(/\bChihuahua\b/g, "Black widow");
    v = v.replace(/\bpit bull(s)?\b/g, "brown recluse$1");
    v = v.replace(/\bPit (B|b)ull(s)?\b/g, "Brown Recluse$2");
    v = v.replace(/\bPug(s)?\b/g, "Wolf Spider$1");
    v = v.replace(/\bpug(s)?\b/g, "Wolf spider$1");
    v = v.replace(/\bPoodle(s)?\b/g, "Common Orb Weaver$1");
    v = v.replace(/\bpoodle(s)?\b/g, "common orb weaver$1");
    v = v.replace(/\bGerman Shepherd(s)?\b/g, "Funnel Web Spider$1");
    v = v.replace(/\bgerman shepherd(s)?\b/g, "funnel web spider$1");
    v = v.replace(/\bPooches?\b/g, "Eight-legged friends");
    v = v.replace(/\bpooches?\b/g, "eight-legged friends");
    v = v.replace(/\bPooch?\b/g, "Arachnid pal$1");
    v = v.replace(/\bpooch?\b/g, "arachnid pal$1");
    v = v.replace(/\bpup(s)?\b/g, "spiderling$1");
    v = v.replace(/\bPup(s)?\b/g, "Spiderling$1");
    v = v.replace(/\b(D|d)aschund(s)?\b/g, "$1olomedes spider$2");
    v = v.replace(/\b(L|l)abrador (R|r)etriever(s)?\b/g, "$1abyrinth orbweaver$3");
    v = v.replace(/\bRetriever(s)?\b/g, "Orbweaver$1");
    v = v.replace(/\bretriever(s)?\b/g, "orbweaver$1");
    v = v.replace(/\b(B|b)ulldog(s)?\b/g, "$1anded garden spider$2");
    v = v.replace(/\b(B|b)order (C|c)ollie(s)?\b/g, "$1lack widow$3");
    v = v.replace(/\b(B|b)oxer(s)?\b/g, "$1razilian salmon tarantula$2");
    v = v.replace(/\b(T|t)errier(s)?\b/g, "$1arantula$2");
    v = v.replace(/\b(C|c)orgi(s)?\b/g, "$1ommon house spider$2");
    v = v.replace(/\bEar(s)?\b/g, "Pedipalp$1");
    v = v.replace(/\bear(s)?\b/g, "pedipalp$1");


    //https://www.google.com/search?client=safari&rls=en&q=daschund&ie=UTF-8&oe=UTF-8
    v = v.replace(/\b(P|p)upp(ies|y)\b/g, function(result) {
        switch (result) {
            case 'Puppies':
                return "Spiderlings";
            case 'puppies':
                return 'spiderlings';
            case 'puppy':
                return 'spiderling';
            default:
                return 'spiderling';
        }
    });

//four-legged
////arachnid
    return v;
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);
