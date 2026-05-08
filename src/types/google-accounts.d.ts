interface GoogleAccountsId {
  initialize(config: GoogleAccountsConfig): void;
  prompt(callback?: (notification: GooglePromptNotification) => void): void;
  renderButton(
    element: HTMLElement | null,
    options: GoogleButtonOptions
  ): void;
  cancel(): void;
}

interface GoogleAccountsConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_select?: boolean;
  context?: 'signin' | 'signup' | 'use';
}

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
  clientId: string;
}

interface GooglePromptNotification {
  isDisplayMoment: () => boolean;
  isDisplayed: () => boolean;
  isNotDisplayed: () => boolean;
  getNotDisplayedReason: () => string;
  getMomentType: () => string;
}

interface GoogleButtonOptions {
  type?: 'standard' | 'icon';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  logo_alignment?: 'left' | 'center';
  width?: number;
  locale?: string;
}

interface GoogleAccounts {
  id: GoogleAccountsId;
}

declare var google: {
  accounts: GoogleAccounts;
};
