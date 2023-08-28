type ActionConfig = [string, string, string, number[]]; // Explicit type for squaresConfig

export class Action {
  static nextId = 1;
  id: number = 0;
  icon: string;
  title: string;
  description: string;
  availableActions: number[] = [];

  constructor(
    icon: string,
    title: string,
    description: string,
    availableActions: number[]
  ) {
    this.id = Action.nextId++;
    this.icon = icon;
    this.title = title;
    this.description = description;
    this.availableActions = availableActions || [];
  }
}

export class ActionExtended extends Action {
  available: boolean;

  constructor(
    icon: string,
    title: string,
    description: string,
    availableActions: number[]
  ) {
    super(icon, title, description, availableActions);
    [1, 2, 3, 4].includes(this.id)
      ? (this.available = false)
      : (this.available = true);
  }

  changeAvailability(available: boolean) {
    this.available = available;
  }
}

export const actions = (): ActionExtended[] => {
  Action.nextId = 1;

  const actionConfigs: ActionConfig[] = [
    ["☝️", "Click Button", "Clicks a button on the page", []],
    ["🔌", "Input Button", "Select an Input in the page", []],
    ["💾", "Store Data", "Select an Element on the Page", []],
    ["❔", "If Condition", "Add a condition to Run Actions Based On It", []],
    ["➰", "For Loop", "Select Multiple Elements On The Page", [1, 2]],
  ];

  return actionConfigs.map((config) => {
    return new ActionExtended(...config);
  });
};
