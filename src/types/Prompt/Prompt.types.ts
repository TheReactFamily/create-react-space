export interface PromptSelectOption<T> {
  title: string;
  value: T;
}

export interface PromptSelect<T> {
  limit?: number;
  message: string;
  options: PromptSelectOption<T>[];
}
