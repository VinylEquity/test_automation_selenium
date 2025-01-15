import { type Page } from '@playwright/test';
import { signInPage } from './signInPage';
import { phoneVerificationPage } from './phoneVerificationPage';
import { dashboardPage } from './dashBoardPage';
import { treasuryOrderPage } from './treasuryOrderPage';
import { portfolioPage} from './portfolioPage';

export class vinylPages{
    readonly page: Page;
    readonly SignInPage;
    readonly DashboardPage;
    readonly TreasuryOrderPage;
    readonly PhoneVerificationPage;
    readonly PortfolioPage;

    constructor(page: Page){
        this.SignInPage = new signInPage(page);
        this.PhoneVerificationPage = new phoneVerificationPage(page);
        this.DashboardPage = new dashboardPage(page);
        this.TreasuryOrderPage =  new treasuryOrderPage(page);
        this.PortfolioPage = new portfolioPage(page);
    }
}