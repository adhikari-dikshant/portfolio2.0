import React from "react";
import "./PlaygroundItem.css";

const PlaygroundItem = ({ title, tag = "Experiment", children, span = 1 }) => {
    return (
        <div className={`playground-item span-${span}`}>
            <div className="playground-item-preview">
                {children}
            </div>
            <div className="playground-item-info">
                <h3>{title}</h3>
                <span className="playground-item-tag">{tag}</span>
            </div>
        </div>
    );
};

export default PlaygroundItem;
