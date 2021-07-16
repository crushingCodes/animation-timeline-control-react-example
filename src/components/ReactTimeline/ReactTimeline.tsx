import React, {useEffect, useState} from 'react';
import './style.css';
import {Timeline, TimelineModel, TimelineOptions, TimelineRow, TimelineRowStyle} from 'animation-timeline-js';

interface TimelineRowWithTitle extends TimelineRow{
    title?:string;
}

type ContainerProps = {
    rows: TimelineRowWithTitle[];
}

function ReactTimeline(props: ContainerProps) {
    const [timeline, setTimeline] = useState<Timeline | null>(null);
    const [options, setOptions] = useState<TimelineOptions | null>(null);
    useEffect(() => {
        const model = {rows: props.rows} as TimelineModel;
        const options = {
            id: "timeline",
            rowsStyle: {
                height: 35,
            } as TimelineRowStyle,
        } as TimelineOptions;
        setOptions(options)
        const timeline2 = new Timeline(options, model);
        setTimeline(timeline2);
        console.log()
    }, [])
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
                        <div className="outline-header" id="outline-header">
                        </div>
                        <div className="outline-scroll-container" id="outline-scroll-container"

                        >
                            <div className="outline-items" id="outline-container">
                                {props.rows.map((row, index) => {
                                    return (<div className={'outline-node'} style={{
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
                    <div id="timeline">
                    </div>
                </footer>
            </div>
        </>
    );
}

export default ReactTimeline;
