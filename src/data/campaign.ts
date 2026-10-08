export interface CampaignStatement {
  tagline: string;
  headline: string;
  subline: string;
  year: string;
  campaignTitle: string;
  credits: { role: string; name: string }[];
}

export const CAMPAIGN_DATA: CampaignStatement = {
  tagline: 'HAUTE JOAILLERIE // WINTER 2026',
  headline: 'NOT AN ACCESSORY. AN ATTITUDE.',
  subline: 'Jewellery conceived not as mere ornament, but as personal armor — sculpted in porcelain light, liquid gold, and hypnotic gemstones.',
  year: 'MMXXVI',
  campaignTitle: 'ACTE I : OBJECTS OF DESIRE',
  credits: [
    { role: 'Creative Direction', name: 'Maison Aurelia Studio' },
    { role: 'Cinematography & Light', name: 'Vincent de la Tour' },
    { role: 'Goldsmith Master', name: 'Jean-Luc Moreau' },
    { role: 'Editorial Styling', name: 'Camille Saint-Laurent' },
    { role: 'Sound & Acoustics', name: 'Monolith Spatial Audio' },
    { role: 'Archival Location', name: 'Place Vendôme & Jaipur City Palace' }
  ]
};
