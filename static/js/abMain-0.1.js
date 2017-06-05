//    Copyright 2017 Satyam Singh
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.


(function () {
    (function (root, factory) {
        if (typeof module !== 'undefined' && module.exports) {
            // CommonJS
            return module.exports = factory();
        } else if (typeof define === 'function' && define.amd) {
            // AMD
            define([], function () {
                return (root.nvABTest = factory());
            });
        } else {
            // Global Variables
            return root.nvABTest = factory();
        }
    })(this, function () {
        return (function () {
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
                                
                            }
                            .nv-noscroll{
                                overflow:hidden!important;
                            }
                            .nvEditorContainer{
                                display: flex;
                                position: fixed;
                                background: rgba(0,0,0,0.3);
                                top: 0;
                                right: 0;
                                left: 0;
                                bottom: 0;
                                z-index: 1030;
                                align-items: center;
                                justify-content: center;
                            }
                            .nvEditorContainer .nvEditor{
                                    position: absolute;
                                    z-index: 1031;
                                    max-width: 900px;
                            }
                            .nvEditorContainer .nvEditorClose{
                                    position: absolute;
                                    z-index: 1031;
                                    top:100px;
                                    right:0;
                                    height:50px;
                                    width:50px;
                                    background:black;
                            }
                            .hide{
                                display:none!important;
                            }
                            `




            function initialize() {
                var d = document.createElement("style");
                d.type = "text/css";
                d.styleSheet ? d.styleSheet.cssText = nvStyle.join("") + toolTipStyle : d.appendChild(document.createTextNode(nvStyle.join("") + toolTipStyle));
                document.head.appendChild(d);
                document.body.addEventListener('mouseover', mouseEnterHandler);
                document.body.addEventListener('click', mouseClickHandler);

            }

            function addEditor(target) {

                //create editor container element
                var editorContainerEl = document.createElement('div');
                editorContainerEl.setAttribute('class', 'nvEditorContainer hide');

                //create editor element
                var editorEl = document.createElement('div');
                editorEl.setAttribute('class', 'nvEditor');

                var closeEl = document.createElement('span');
                closeEl.setAttribute('class', 'nvEditorClose');

                editorContainerEl.appendChild(closeEl);

                editorContainerEl.appendChild(editorEl);

                //append the editor container element in the body
                target.parentNode.appendChild(editorContainerEl);


            }




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
                        showEditor(evt.target);
                        addClass(evt.target, 'nvCustom-el-clicked');


                    }

                }
            }

            function closeEditor(evt) {
                document.body.classList.remove('nv-noscroll');
                var editorEl = document.querySelector('.nvEditor');
                var editorContainerEl = document.querySelector('.nvEditorContainer');
                isEditorOpen = false;
                editorContainerEl.classList.add('hide');
                if (!$(editorEl).data('froala.editor')) {
                    $(editorEl).froalaEditor('destroy');
                }

                // if (editorContainerEl) {
                //     editorContainerEl.remove();
                // }

            }

            function showEditor(target) {
                addEditor(target);
                document.body.classList.add('nv-noscroll');
                var editorEl = document.querySelector('.nvEditor');
                var editorContainerEl = document.querySelector('.nvEditorContainer');
                if (editorEl) {
                    editorEl.appendChild(target);
                }
                isEditorOpen = true;
                // $(editorEl).froalaEditor();
                if (!$(editorEl).data('froala.editor')) {
                    $(editorEl).froalaEditor();
                }
                editorContainerEl.classList.remove('hide');

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
            return initialize;
        })();
    });
}).call(this);

nvABTest();