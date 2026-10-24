import { skillCategories } from "./skills";

/**
 * A single list for stack-oriented views. The skills data remains the source
 * of truth so this list cannot introduce a technology that is not documented
 * in the portfolio.
 */
export const stackData = skillCategories.flatMap((category) =>
  category.skills.map((skill) => skill.name)
);
