import React, {useEffect, useState} from 'react';
import './style.scss';
import {
    Timeline,
    TimelineInteractionMode,
    TimelineModel,
    TimelineOptions,
    TimelineRow,
    TimelineRowStyle
} from 'animation-timeline-js';
import {cleanup} from '@testing-library/react';

interface TimelineRowWithTitle extends TimelineRow {
    title?: string;
}

type ContainerProps = {
    rows: TimelineRowWithTitle[];
}

function ReactTimeline(props: ContainerProps) {
    const [_timeline, setTimeline] = useState<Timeline | null>(null);
    const [options, setOptions] = useState<TimelineOptions | null>(null);
    const [scrollHeight, setScrollHeight] = useState<number>()
    const [scrollContainerDiv, setScrollContainerDiv] = useState<HTMLDivElement | null>()

    /*Handle events from html page*/
    function selectMode() {
        if (_timeline) {
            _timeline.setInteractionMode(TimelineInteractionMode.Selection);
        }
    }

    function zoomMode() {
        if (_timeline) {
            _timeline.setInteractionMode(TimelineInteractionMode.Zoom);
        }
    }

    function panMode() {
        if (_timeline) {
            _timeline.setInteractionMode(TimelineInteractionMode.Pan);
        }
    }

    useEffect(() => {
        // Init Timeline
        if (!_timeline) {
            const model = {rows: props.rows} as TimelineModel;
            const options = {
                id: "timeline",
                rowsStyle: {
                    height: 35,
                    marginBottom: 2,
                } as TimelineRowStyle,
            } as TimelineOptions;
            setOptions(options)
            const timeline = new Timeline(options, model);
            setTimeline(timeline);
            setScrollHeight(timeline?._scrollContainer?.scrollHeight);
        }

        // Functionality
        if (scrollContainerDiv) {
            // Using the built in listener over Reacts onScroll
            // allows a workaround in being able to hide the left
            // scrollbar while maintaining functionality
            scrollContainerDiv.addEventListener("wheel", (e) => {
                _timeline?._handleWheelEvent(e)
            })
            _timeline?.onScroll(e => {
                scrollContainerDiv.scrollTop = e.scrollTop;
            })
        }
        // Select all elements on key down
        if (_timeline) {
            document.addEventListener('keydown', function (args) {
                // Ctrl + a || Ctrl + A
                if ((args.which === 65 || args.which === 97) && _timeline._controlKeyPressed(args)) {
                    _timeline.selectAllKeyframes();
                    args.preventDefault();
                }
            });
        }

        // Logging
        const logMessage = function (message: string, log = 1) {
            if (message) {
                let el = document.getElementById("output" + log);
                if (el) {
                    el.innerHTML = message + '<br/>' + el.innerHTML;
                }
            }
        }

        const logDraggingMessage = function (object: any, eventName: string) {
            if (object.elements) {
                logMessage('Keyframe value: ' + object.elements[0].val + '. Selected (' + object.elements.length + ').' + eventName);
            }
        }
        if (_timeline) {
            _timeline.onTimeChanged(function (event) {
                logMessage(event.val + "ms source:" + event.source, 2);
            });
            _timeline.onSelected(function (obj) {
                logMessage('selected :' + obj.selected.length + '. changed :' + obj.changed.length, 2);
            });
            _timeline.onDragStarted(function (obj) {
                logDraggingMessage(obj, 'dragstarted');
            });
            _timeline.onDrag(function (obj) {
                logDraggingMessage(obj, 'drag');
            });
            _timeline.onKeyframeChanged(function (obj) {
                console.log('keyframe: ' + obj.val);
            });
            _timeline.onDragFinished(function (obj) {
                logDraggingMessage(obj, 'dragfinished');
            });
            _timeline.onMouseDown(function (obj) {
                const type = (obj.target ? obj.target.type : '');
                logMessage('mousedown:' + obj.val + '.  elements:' + type, 2);
            });
            _timeline.onDoubleClick(function (obj) {
                const type = (obj.target ? obj.target.type : '');
                logMessage('doubleclick:' + obj.val + '.  elements:' + type, 2);
            });
        }

        // Cleanup
        return () => {
            scrollContainerDiv?.removeEventListener('wheel', (e) => {
            });
            document.removeEventListener('keydown', function (args) {
            });
        }
    }, [scrollContainerDiv])
    return (
        <>
            <div className="app-container">
                <main>
                    <aside>
                    </aside>
                    <div className="content">
                        <div id="currentTime"
                        />
                        <div className="logs">
                            <div className="output" id="output1"/>
                            <div className="output" id="output2"/>
                        </div>

                    </div>
                </main>
                <div className="toolbar">
                    <button className="button mat-icon material-icons mat-icon-no-color"
                            onClick={selectMode}
                    >tab_unselected
                    </button>
                    <button className="button mat-icon material-icons mat-icon-no-color"
                            onClick={panMode}
                    >pan_tool
                    </button>
                    <button className="button mat-icon material-icons mat-icon-no-color"
                            onClick={zoomMode}
                    >search
                    </button>
                    <div className="links">
                        <a href="./tests/unittests.html">UnitTests</a>
                        <a className="git-hub-link"
                           href="https://github.com/ievgennaida/animation-timeline-control">GitHub</a>
                    </div>
                </div>
                <footer>
                    <div className="outline">
                        <div className="outline-header" id="outline-header"
                             style={{
                                 minHeight: options?.rowsStyle?.height + 'px',
                                 maxHeight: options?.rowsStyle?.height + 'px',
                                 marginTop: '-5px'
                             }}
                        >
                        </div>
                        <div className="outline-scroll-container" id="outline-scroll-container"
                             ref={(ref) => setScrollContainerDiv(ref)}
                             style={{overflowY: 'scroll'}}
                        >
                            <div className="outline-items" id="outline-container"
                                 style={{minHeight: scrollHeight}}
                            >
                                {props.rows.map((row, index) => {
                                    return (<div key={index} className={'outline-node'} style={{
                                        marginBottom: options?.rowsStyle?.marginBottom,
                                        minHeight: options?.rowsStyle?.height + 'px',
                                        maxHeight: options?.rowsStyle?.height + 'px',
                                    }}>
                                        {
                                            row.title || "Track " + index
                                        }
                                    </div>)
                                })
                                }
                            </div>
                        </div>
                    </div>
                    <div id={"timeline"}
                    >
                    </div>
                </footer>
            </div>
        </>
    );
}

export default ReactTimeline;
