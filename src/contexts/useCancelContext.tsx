import { createContext, useState } from "react";

export type StepType =
  | "COST"
  | "MISSING_FEATURES"
  | "TECHNICAL_ISSUES"
  | "OTHER"
  | "CUSTOMER_SUPPORT"
  | "";

export interface ICancelContext {
  prevStep: number;
  step: number;
  stepType: StepType;
  messageStep2: string;
  messageStep3: string;
  setMessageStep2: (message: string) => void;
  setMessageStep3: (message: string) => void;
  nextStep: (stepParam: number) => void;
  setStepType: (stepType: StepType) => void;
  backStep: () => void;
  resetStep: () => void;
}

export const CancelContext = createContext<ICancelContext>({
  prevStep: 0,
  step: 1,
  setMessageStep2: (message: string) => {},
  setMessageStep3: (message: string) => {},
  nextStep: (stepParam: number) => {},
  messageStep2: "",
  messageStep3: "",
  backStep: () => {},
  resetStep: () => {},
  stepType: "COST",
  setStepType: (stepType: StepType) => {},
});

export const useCancelContext = (): ICancelContext => {
  const [prevStep, setPrevStep] = useState<number>(1);
  const [step, setStep] = useState<number>(1);
  const [messageStep2, setMessageStep2] = useState("");
  const [messageStep3, setMessageStep3] = useState("");
  const [stepType, setStepType] = useState<StepType>("");

  const nextStep = (stepParam: number) => {
    setPrevStep(step);
    setStep(stepParam);
  };

  const backStep = () => {
    setPrevStep(prevStep - 1);
    setStep(prevStep);
  };

  const resetStep = () => {
    setStep(1);
  };

  return {
    step,
    messageStep2,
    messageStep3,
    setMessageStep2,
    setMessageStep3,
    nextStep,
    prevStep,
    backStep,
    resetStep,
    setStepType,
    stepType,
  };
};
