import type { CbrDraggableInterface } from "./cbrDraggableInterface";
import type { CbrHoverEnterDelegate, CbrHoverEnterEvent, CbrHoverExitDelegate, CbrHoverExitEvent, CbrPinEvent, CbrUnpinnedEvent } from "./cbrDragNDropTypes";


export interface CbrDraggableControllerEventsInterface {

    onHoverEnter(draggable: CbrDraggableInterface, event: CbrHoverEnterEvent, delegate: CbrHoverEnterDelegate): void;
    onHoverExit(draggable: CbrDraggableInterface, event: CbrHoverExitEvent, delegate: CbrHoverExitDelegate): void
    onPin(draggable: CbrDraggableInterface, event: CbrPinEvent): void;
    onUnpin(draggable: CbrDraggableInterface, event: CbrUnpinnedEvent): void;
}


export interface CbrDraggableControllerInterface extends CbrDraggableControllerEventsInterface {

    pinAreaElement: HTMLElement;
    freeAreaElement: HTMLElement;

    getPinAreaFromPoint(x: number, y: number): Element | undefined;

    registerDraggable(draggable: CbrDraggableInterface): void;

    /**
     * return if the given element can be used to start a drag operation
     * 
     * @param elm: HTMLElement
     * @returns true if the element can be used to start a drag operation, false otherwise
     */
    canPick(elm: HTMLElement): boolean;

    unpin(): void;

    addToFreeArea(elm: HTMLElement, freeArea: HTMLElement): void;
}


export type CbrDraggableControllerOptions = {
    pinAreaSelector: string;
    freeAreaSelector: string;
}


export class CbrDraggableController implements CbrDraggableControllerInterface {

    pinAreaSelector_: string;
    freeAreaSelector_: string;
    draggable_: CbrDraggableInterface | undefined;

    constructor(options: CbrDraggableControllerOptions) {
        this.pinAreaSelector_ = options.pinAreaSelector;
        this.freeAreaSelector_ = options.freeAreaSelector;
    }

    get pinAreaElement(): HTMLElement {
        return document.querySelector(this.pinAreaSelector_) as HTMLElement;
    }

    get freeAreaElement(): HTMLElement {
        return document.querySelector(this.freeAreaSelector_) as HTMLElement;
    }

    getPinAreaFromPoint(x: number, y: number): Element | undefined {
        if (this.pinAreaSelector_ === '') {
          return undefined
        }
    
        let elements: Element[] | null = null
        let dropArea : Element | undefined = undefined;
    
        elements = document.elementsFromPoint(x, y);

        dropArea = elements.find((element) => {
        return element.matches(this.pinAreaSelector_)
        })
    
        return dropArea;
    }

    canPick(elm: HTMLElement): boolean {
        return !(elm && elm.hasAttribute('cbr-dragndrop-no-pick'));
    }

    onHoverEnter(draggable: CbrDraggableInterface, event: CbrHoverEnterEvent, delegate: CbrHoverEnterDelegate): void {
        console.log('onHoverEnter', event);

        delegate(event);
    }
    
    onHoverExit(draggable: CbrDraggableInterface, event: CbrHoverExitEvent, delegate: CbrHoverExitDelegate): void {
        console.log('onHoverExit', event);

        delegate(event);
    }

    onPin(draggable: CbrDraggableInterface, event: CbrPinEvent) {
        console.log('onPin', event);

        event.pinArea.appendChild(event.draggableElement);
    }

    onUnpin(draggable: CbrDraggableInterface, event: CbrUnpinnedEvent): void {
        console.log('onUnpin', event);
    }


    unpin(): void {
        if (this.draggable_) {
            this.draggable_.unpin();
        }
    }

    registerDraggable(draggable: CbrDraggableInterface): void {
        this.draggable_ = draggable;
    }

    addToFreeArea(elm: HTMLElement, freeArea: HTMLElement): void {
        freeArea.appendChild(elm);
        elm.style.left  = "";
        elm.style.top  = "";
        elm.style.position = '';  
    }
}
