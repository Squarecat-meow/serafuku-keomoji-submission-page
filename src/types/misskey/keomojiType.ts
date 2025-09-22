export interface IKeomoji {
  aliases: string[];
  name: string;
  category: string;
  host: string | null;
  url: string;
  licenses: string | null;
  isSensitive: boolean;
  localOnly: boolean;
}

export interface IKeomojiModify extends IKeomoji {
  id: number;
}
