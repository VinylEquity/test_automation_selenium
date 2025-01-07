import { page, expect } from '@playwright/test';
import {mailHelper} from "../support/mail.helper";

export const mailerMethods = {
    async login_mail(subject: string, toAddress: string){
        const emailHTML = await mailHelper.readEmail(page, process.env.FROM_MAIL, toAddress, subject);
        const login_link = await mailHelper.getLoginLink(emailHTML);
        return login_link;
    }
};