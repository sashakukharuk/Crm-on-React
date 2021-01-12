import {RefObject} from "react";

declare var M: any

export class MaterialService {
    static toast(message: string) {
        if (message) {
            M.toast({html: message})
        }
    }

    static initializeFloatingButton(ref: RefObject<HTMLDivElement>) {
        M.FloatingActionButton.init(ref.current)
    }

    static updateTextInputs() {
        M.updateTextFields()
    }
}
