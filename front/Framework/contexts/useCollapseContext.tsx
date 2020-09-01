import * as React from 'react';
import collapseContext from "./collapseContext";

export default function useCollapseContext() {
    return React.useContext(collapseContext);
}
