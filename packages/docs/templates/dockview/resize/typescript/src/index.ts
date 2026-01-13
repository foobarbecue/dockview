import 'dockview-core/dist/styles/dockview.css';
import {
    createDockview,
    GroupPanelPartInitParameters,
    IContentRenderer,
    themeAbyss,
} from 'dockview-core';
import './resize.css';

class ResizePanel implements IContentRenderer {
    private readonly _element: HTMLElement;
    private readonly widthInput: HTMLInputElement;
    private readonly heightInput: HTMLInputElement;
    private readonly titleElement: HTMLElement;

    get element(): HTMLElement {
        return this._element;
    }

    constructor() {
        this._element = document.createElement('div');
        this._element.className = 'resize-panel';

        // Create title display
        this.titleElement = document.createElement('div');
        this.titleElement.style.height = '25px';
        this.titleElement.style.marginBottom = '10px';

        // Create width control section
        const widthControl = document.createElement('div');
        widthControl.className = 'resize-control';

        const widthLabel = document.createElement('span');
        widthLabel.textContent = 'Width:';
        
        this.widthInput = document.createElement('input');
        this.widthInput.type = 'number';
        this.widthInput.value = '200';
        this.widthInput.min = '50';
        this.widthInput.step = '1';

        const resizeWidthGroupBtn = document.createElement('button');
        resizeWidthGroupBtn.textContent = 'Resize Group';
        resizeWidthGroupBtn.style.width = '100px';

        const resizeWidthPanelBtn = document.createElement('button');
        resizeWidthPanelBtn.textContent = 'Resize Panel';
        resizeWidthPanelBtn.style.width = '100px';

        widthControl.append(widthLabel, this.widthInput, resizeWidthGroupBtn, resizeWidthPanelBtn);

        // Create height control section
        const heightControl = document.createElement('div');
        heightControl.className = 'resize-control';

        const heightLabel = document.createElement('span');
        heightLabel.textContent = 'Height:';
        
        this.heightInput = document.createElement('input');
        this.heightInput.type = 'number';
        this.heightInput.value = '200';
        this.heightInput.min = '50';
        this.heightInput.step = '1';

        const resizeHeightGroupBtn = document.createElement('button');
        resizeHeightGroupBtn.textContent = 'Resize Group';
        resizeHeightGroupBtn.style.width = '100px';

        const resizeHeightPanelBtn = document.createElement('button');
        resizeHeightPanelBtn.textContent = 'Resize Panel';
        resizeHeightPanelBtn.style.width = '100px';

        heightControl.append(heightLabel, this.heightInput, resizeHeightGroupBtn, resizeHeightPanelBtn);

        this._element.append(this.titleElement, widthControl, heightControl);
    }

    init(parameters: GroupPanelPartInitParameters): void {
        const api = parameters.api;
        this.titleElement.textContent = api.title;

        // Get buttons
        const controls = this._element.querySelectorAll('.resize-control');
        const widthControl = controls[0];
        const heightControl = controls[1];

        const widthButtons = widthControl.querySelectorAll('button');
        const resizeWidthGroupBtn = widthButtons[0];
        const resizeWidthPanelBtn = widthButtons[1];

        const heightButtons = heightControl.querySelectorAll('button');
        const resizeHeightGroupBtn = heightButtons[0];
        const resizeHeightPanelBtn = heightButtons[1];

        // Width resize handlers
        resizeWidthGroupBtn.addEventListener('click', () => {
            const width = Number(this.widthInput.value);
            api.group.api.setSize({ width });
        });

        resizeWidthPanelBtn.addEventListener('click', () => {
            const width = Number(this.widthInput.value);
            api.setSize({ width });
        });

        // Height resize handlers
        resizeHeightGroupBtn.addEventListener('click', () => {
            const height = Number(this.heightInput.value);
            api.group.api.setSize({ height });
        });

        resizeHeightPanelBtn.addEventListener('click', () => {
            const height = Number(this.heightInput.value);
            api.setSize({ height });
        });
    }
}

const api = createDockview(document.getElementById('app'), {
    theme: themeAbyss,
    createComponent: (options) => {
        switch (options.name) {
            case 'default':
                return new ResizePanel();
            default:
                throw new Error(`Unknown component: ${options.name}`);
        }
    },
});

// Add panels with different initial sizes to demonstrate initialWidth and initialHeight
api.addPanel({
    id: 'panel_1',
    component: 'default',
    title: 'Panel 1 (Initial: 300x150)',
    initialWidth: 300,
    initialHeight: 150,
});

api.addPanel({
    id: 'panel_2',
    component: 'default',
    title: 'Panel 2 (Initial: 400x200)',
    position: {
        direction: 'right',
        referencePanel: 'panel_1',
    },
    initialWidth: 400,
    initialHeight: 200,
});

api.addPanel({
    id: 'panel_3',
    component: 'default',
    title: 'Panel 3 (Initial: 250x180)',
    position: {
        direction: 'below',
        referencePanel: 'panel_1',
    },
    initialWidth: 250,
    initialHeight: 180,
});

// Add panels without initial size to the same group as panel_1
api.addPanel({
    id: 'panel_4',
    component: 'default',
    title: 'Panel 4 (No Initial Size)',
    position: {
        referencePanel: 'panel_1',
    },
});

api.addPanel({
    id: 'panel_5',
    component: 'default',
    title: 'Panel 5 (No Initial Size)',
    position: {
        referencePanel: 'panel_1',
    },
});
