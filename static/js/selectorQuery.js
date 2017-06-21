function selectorQuery(node)  {
    var ignoreClassList = ["over", "hover", "active", "selected", "scrolled"];
    if (typeof node !== 'object') {
        throw new Error('expects dom node')
    }

    var selector = '';


    if (node.nodeName === 'HTML') {
        return 'html'
    }

    do { 
        var elSelector = '';
        if (node.nodeName === 'HTML' | node.nodeName === '#document') {
            selector += elSelector;
            break;
        }

        if (node.id) {
            elSelector += ' #' + node.id
            selector += elSelector;
            break;
        }

        if (node.nodeName === 'BODY') {
            elSelector += ' ' + 'body'
            selector += elSelector;
            continue;
        }

        // refactor me *dying cough*
        if (node.className) {
            elSelector += ' ' + node.nodeName.toLowerCase() + (node.className.trim().split(/\s+/).map(function (x) {
                if (ignoreClassList.indexOf(x) === -1) {
                    return '.' + x.replace('.', '\\\\.');
                }
                return '';
            }).join(''));

            if (node.parentNode.childNodes.length > 1 && node.parentNode.querySelectorAll(elSelector).length > 1) {
                elSelector += ':nth-child(' + getdata.getNth(node) + ')';
            }
        } else {
            elSelector += ' ' + node.nodeName.toLowerCase();
            if (node.parentNode.childNodes.length > 1 && node.parentNode.querySelectorAll(elSelector).length > 1) {
                elSelector += ':nth-child(' + getdata.getNth(node) + ')';
            }
        }

        selector += elSelector;

    } while (node = node.parentNode)

    selector = selector.split(' ').reverse().join(' ')
    return selector || null
}

function getNth(node) {
    var startNode = node

    var i = 1
    while (node = node.previousElementSibling) {
        ++i
    }
    return i
}