export const scene2Timing = {
  intro: 0.07,
  fragments: 0.16,
  particleBirth: 0.43,
  sentencePeak: 0.54,
  environment: 0.64,
  handoff: 0.72,
}

export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
