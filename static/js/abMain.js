(function (global, document) {
    const nvStyle = [".nvCustom-el-hovered {",
        "background:rgba(0,0,0,0.2)!important; border-radius:2px;", "}"
    ];
    var toolTipStyle = `[data-tooltip] {
            position: relative;
            z-index: 1031;
            cursor: pointer;
            }

            /* Hide the tooltip content by default */
            [data-tooltip]:before,
            [data-tooltip]:after {
            visibility: hidden;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
            filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);
            opacity: 0;
            pointer-events: none;
            }

            /* Position tooltip above the element */
            [data-tooltip]:before {
            position: absolute;
            bottom: 100%;
            right: 0;
            margin-bottom: 5px;
            margin-left: -80px;
            padding: 3px;
            min-width: 100px;
            -webkit-border-radius: 1px;
            -moz-border-radius: 1px;
            border-radius: 1px;
            background-color: #000;
            background-color: hsla(0, 0%, 20%, 0.9);
            color: #fff;
            content: attr(data-tooltip);
            text-align: center;
            font-size: 12px;
            line-height: 1.2;
            }

            /* Triangle hack to make tooltip look like a speech bubble */
            [data-tooltip]:after {
            position: absolute;
            bottom: 100%;
            right: 5%;
            margin-left: -5px;
            width: 0;
            border-top: 5px solid #000;
            border-top: 5px solid hsla(0, 0%, 20%, 0.9);
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
            content: " ";
            font-size: 0;
            line-height: 0;
            }

            /* Show tooltip content on hover */
            [data-tooltip]:hover:before,
            [data-tooltip]:hover:after {
            visibility: visible;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
            filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);
            opacity: 1;
        }
        .nvCustom-el-clicked{
            background:rgba(0,0,0,.4)!important;
        }
        .nv-noscroll{
            overflow:hidden!important;
        }
       
        `
    var d = document.createElement("style");

    d.type = "text/css";
    d.styleSheet ? d.styleSheet.cssText = nvStyle.join("") + toolTipStyle : d.appendChild(document.createTextNode(nvStyle.join("") + toolTipStyle));
    document.head.appendChild(d);
    document.body.addEventListener('mouseover', mouseEnterHandler);
    document.body.addEventListener('click', mouseClickHandler);
    // document.body.addEventListener('')

    var isEditorOpen = false;

    function mouseClickHandler(evt) {
        evt.preventDefault();
        if (evt.target) {
            if (!isEditorOpen) {
                // we first remove all custom class and atribute added
                removeClass('nvCustom-el-hovered');
                removeAttribute('data-tooltip');

                // now get the css selector 


                // with cssSelector
                // if (UTILS) {
                //     var absPath = UTILS.cssPath(evt.target);
                //     console.log(absPath);
                // } else {
                //     throw new Error('Some thing went wrong');
                // }

                //with selectorQuery
                var absPath = selectorQuery(evt.target);
                console.log(absPath);


                // after this add the class for visual


                addClass(evt.target, 'nvCustom-el-clicked');

                showEditor(evt.target);
            }

        }
    }

    function showEditor(target) {
        document.body.classList.add('nv-noscroll');
        isEditorOpen = true;
        $(target).froalaEditor();

    }

    function mouseEnterHandler(evt) {
        if (!isEditorOpen) {
            if (evt.target) {
                addClass(evt.target, 'nvCustom-el-hovered');
            }
        }
    }

    function addAttribute(element, nvAttr) {
        if (element && nvAttr) {
            element.setAttribute(nvAttr, getToolTipData(element));
        }
    }

    function removeAttribute(attr) {
        const elArray = document.querySelectorAll('[' + attr + ']');
        elArray.forEach(function (element) {
            element.removeAttribute(attr);
        }, this);
    }

    function addClass(element, nvClass) {
        removeClass(nvClass);
        removeAttribute('data-tooltip');
        if (element && nvClass) {
            addAttribute(element, 'data-tooltip');
            element.classList.add(nvClass);
        }
    }

    function getToolTipData(element) {
        if (element) {
            const nodeName = element.nodeName;
            const classList = element.classList.value;
            var newStr = '';
            if (classList.length > 0) {
                const classListArray = classList.split(' ');
                classListArray.forEach(function (element) {
                    newStr = newStr + ' .' + element;
                }, this);
            }
            return nodeName + newStr;
        }
    }

    function removeClass(nvClass) {
        const elArray = document.querySelectorAll('.' + nvClass);
        elArray.forEach(function (element) {
            element.classList.remove(nvClass);
        }, this);
    }


})(self, document);