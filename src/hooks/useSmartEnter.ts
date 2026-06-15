"use client";

import { useCallback } from "react";

export function useSmartEnter() {
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const target = e.target as HTMLElement;

      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        (target.tagName === "INPUT" && (target as HTMLInputElement).type === "submit")
      ) {
        return;
      }

      if (target.tagName === "TEXTAREA") {
        return;
      }

      e.preventDefault();

      const form = e.currentTarget;
      const elements = Array.from(form.querySelectorAll("input, select, textarea, button[type='submit']")) as HTMLElement[];
      
      const interactableElements = elements.filter((el) => {
        if (el.hasAttribute("disabled") || el.hasAttribute("readonly") || el.hidden) {
          if (el.tagName !== "BUTTON") return false;
        }
        if (el.tagName === "INPUT") {
          const type = (el as HTMLInputElement).type;
          if (type === "hidden" || type === "file") return false;
        }
        return true;
      });

      const currentIndex = interactableElements.indexOf(target);
      if (currentIndex === -1) return; // Target not found in list

      let isValid = true;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA"
      ) {
        const inputEl = target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        isValid = inputEl.checkValidity();
        if (!isValid) {
          inputEl.reportValidity();
        }
      }

      if (!isValid) {
        return;
      }

      const emptyFields = interactableElements.filter((el) => {
        if (el.tagName === "BUTTON") return false;
        if (el.tagName === "INPUT") return !(el as HTMLInputElement).value.trim();
        if (el.tagName === "SELECT") return !(el as HTMLSelectElement).value.trim();
        if (el.tagName === "TEXTAREA") return !(el as HTMLTextAreaElement).value.trim();
        return false;
      });

      if (emptyFields.length > 0) {
        const nextEmpty = emptyFields.find((el) => interactableElements.indexOf(el) > currentIndex);
        
        if (nextEmpty) {
          nextEmpty.focus();
        } else {
          emptyFields[0].focus();
        }
      } else {
        const submitBtn = interactableElements.find(
          (el) => el.tagName === "BUTTON" && (el as HTMLButtonElement).type === "submit"
        );
        if (submitBtn) {
          submitBtn.click();
        }
      }
    }
  }, []);

  return { handleKeyDown };
}
