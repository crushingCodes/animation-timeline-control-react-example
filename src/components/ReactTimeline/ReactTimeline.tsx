import React, {useEffect, useState} from 'react';
import './style.css';
import {Timeline, TimelineModel, TimelineOptions, TimelineRow, TimelineRowStyle} from 'animation-timeline-js';

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
    useEffect(() => {
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

        if (scrollContainerDiv && scrollContainerDiv.scrollHeight) {
            console.log('setting scroll div')

            _timeline?.onScroll(e => {
                scrollContainerDiv.scrollTop = e.scrollTop;
                scrollContainerDiv.style.minHeight = String(701 + ' px');
                // scrollContainerDiv.scrollHeight = e.scrollHeight;
                // scrollContainerDiv.setAttribute('scrollHeight',String(e.scrollHeight));
                console.log(e)
            })
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
                    >tab_unselected
                    </button>
                    <button className="button mat-icon material-icons mat-icon-no-color"
                    >pan_tool
                    </button>
                    <button className="button mat-icon material-icons mat-icon-no-color"
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
                    <div id={"timeline"}>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default ReactTimeline;
