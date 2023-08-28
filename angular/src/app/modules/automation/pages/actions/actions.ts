type ActionConfig = [string, string, string, Action[]]; // Explicit type for squaresConfig

export class Action {
  static nextId = 1;
  id: number = 0;
  icon: string;
  title: string;
  description: string;
  childActions: Action[] = [];

  constructor(
    icon: string,
    title: string,
    description: string,
    childActions: Action[]
  ) {
    this.id = Action.nextId++;
    this.icon = icon;
    this.title = title;
    this.description = description;
    this.childActions = childActions || [];
  }
}

export class ActionExtended extends Action {
  available: boolean;

  constructor(
    icon: string,
    title: string,
    description: string,
    childActions: Action[]
  ) {
    super(icon, title, description, childActions);
    [1, 2, 3, 4].includes(this.id)
      ? (this.available = false)
      : (this.available = true);
  }
}

const buildActions = (): ActionExtended[] => {
  const actionConfigs: ActionConfig[] = [
    ["☝️", "Click Button", "Clicks a button on the page", []],
    ["🔌", "Input Button", "Select an Input in the page", []],
    ["💾", "Store Data", "Select an Element on the Page", []],
    ["❔", "If Condition", "Add a condition to Run Actions Based On It", []],
    ["➰", "For Loop", "Select Multiple Elements On The Page", []],
  ];

  return actionConfigs.map((config) => {
    return new ActionExtended(...config);
  });
};

export const actions = () => {
  const config = {
    // meaning that action 5 will have action 1 as its child
    5: [1],
  };

  const actions = buildActions();

  Object.keys(config).forEach((key) => {
    const parentAction = actions.find((action) => action.id === +key);
    const childActions = config[key].map((id) =>
      actions.find((action) => action.id === id)
    );
    parentAction.childActions.push(childActions);
  });

  return actions;
};
