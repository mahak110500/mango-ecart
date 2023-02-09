import { FormGroup } from '@angular/forms';

    
export function ConfirmedValidator(password: string, confirmPassword: string){
    return (authFormGroup: FormGroup) => {
        const newPassword = authFormGroup.controls[password];
        const newConfirmPassword = authFormGroup.controls[confirmPassword];
        if (newConfirmPassword.errors && !newConfirmPassword.errors.confirmedValidator) {
            return;
        }
        if (newPassword.value !== newConfirmPassword.value) {
            newConfirmPassword.setErrors({ confirmedValidator: true });
        } else {
            newConfirmPassword.setErrors(null);
        }
    }
}