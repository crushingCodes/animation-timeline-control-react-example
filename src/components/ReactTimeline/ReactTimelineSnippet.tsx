// This is the minimal working example for the README.md
import React, {useEffect} from 'react';
import {
    Timeline,
    TimelineModel,
    TimelineOptions,
    TimelineRow,
    TimelineRowStyle
} from 'animation-timeline-js';

function ReactTimeline(props: any) {
    useEffect(() => {
        // Init Timeline
        const model = {rows: [] as Array<TimelineRow>} as TimelineModel;
        const options = {
            id: "timeline",
            rowsStyle: {
                height: 35,
                marginBottom: 2,
            } as TimelineRowStyle,
        } as TimelineOptions;
        const timeline = new Timeline(options, model);
    }, [])
    return (
        <>
            <footer>
                <div id={"timeline"}>
                </div>
            </footer>
        </>
    );
}

export default ReactTimeline;
