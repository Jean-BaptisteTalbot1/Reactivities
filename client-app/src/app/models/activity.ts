export interface Activity { // On the C# world, we use the I prefixe (IActivity) but not on typescript
    id:          string;
    title:       string;
    date:        string;
    description: string;
    category:    string;
    city:        string;
    venue:       string;
}