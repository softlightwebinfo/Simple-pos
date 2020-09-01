import * as React from 'react';

export interface ICollapseContext {
    active?: number;
    onSelect?(id: number): void;
}

const CollapseContext = React.createContext<ICollapseContext>({});
CollapseContext.displayName = 'CollapseContext';
export default CollapseContext;

