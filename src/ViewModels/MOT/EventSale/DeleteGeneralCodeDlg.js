import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-dependency-injection';

@inject(DialogController)
export class DeleteGeneralCodeDlg {
    dialogController: DialogController;

    listAction: any;
    check: boolean;
    constructor(dialogController) {

        this.dialogController = dialogController;

    }

    activate(data) {
        this.entity = data;

    }
    deleteDeActive(entity) {

        this.dialogController.ok(entity);

    }


}