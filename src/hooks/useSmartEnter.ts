"use client";

import { useCallback } from "react";

export function useSmartEnter() {
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    // Only intercept Enter key (and not Shift+Enter which is typically for newlines in textareas)
    if (e.key === "Enter" && !e.shiftKey) {
      const target = e.target as HTMLElement;

      // Ignore if the event is happening on a button, submit input, or anchor tag
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        (target.tagName === "INPUT" && (target as HTMLInputElement).type === "submit")
      ) {
        return;
      }

      // Ignore if the event is happening on a textarea (we want to let standard 'Enter' behavior work, unless we strictly want to override it. We'll let Shift+Enter do new lines if they want, but normal Enter will navigate if we wanted to. However, standard UX is Enter in textarea = new line. So we will ignore textarea for this smart navigation, unless specified).
      // Wait, the user said "untuk semua form ... misal field itu belum diisi ya gabisa dienter ...". 
      // If we want it to apply to Textarea, we should intercept it too.
      // Let's intercept textarea ONLY IF we want to force them to use Shift+Enter for newlines.
      // Usually it's safer to just skip Textareas for "Enter" navigation, but let's include it if it's empty to prevent skipping.
      // Actually, if a textarea is empty and they press Enter, they might just want to start with a newline? 
      // Let's only intercept if it's an INPUT or SELECT. Textareas will behave normally.
      if (target.tagName === "TEXTAREA") {
        return;
      }

      e.preventDefault();

      const form = e.currentTarget;
      // Get all interactive elements that can be focused
      const elements = Array.from(form.querySelectorAll("input, select, textarea, button[type='submit']")) as HTMLElement[];
      
      // Filter out hidden, disabled, or read-only elements (except submit buttons which might be disabled temporarily but are the end goal)
      const interactableElements = elements.filter((el) => {
        if (el.hasAttribute("disabled") || el.hasAttribute("readonly") || el.hidden) {
          // Allow disabled submit button so we can focus it, or we just let them try to submit.
          // Actually, if a button is disabled, focusing it might not do much, but we can target it.
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

      // 1. Check if current field is filled
      let isFilled = true;
      if (target.tagName === "INPUT") {
        isFilled = !!(target as HTMLInputElement).value.trim();
      } else if (target.tagName === "SELECT") {
        isFilled = !!(target as HTMLSelectElement).value.trim();
      }

      if (!isFilled) {
        // If not filled, don't move, just stay here.
        // We could also trigger a visual shake or validation message here if needed.
        return;
      }

      // 2. If filled, find the NEXT EMPTY field in the entire form
      // We search all input/select/textarea elements.
      const emptyFields = interactableElements.filter((el) => {
        if (el.tagName === "BUTTON") return false;
        if (el.tagName === "INPUT") return !(el as HTMLInputElement).value.trim();
        if (el.tagName === "SELECT") return !(el as HTMLSelectElement).value.trim();
        if (el.tagName === "TEXTAREA") return !(el as HTMLTextAreaElement).value.trim();
        return false;
      });

      if (emptyFields.length > 0) {
        // If there are empty fields, find the first one that comes AFTER the current index
        const nextEmpty = emptyFields.find((el) => interactableElements.indexOf(el) > currentIndex);
        
        if (nextEmpty) {
          nextEmpty.focus();
        } else {
          // If no empty fields after, just wrap around to the first empty field
          emptyFields[0].focus();
        }
      } else {
        // 3. If NO empty fields remain, find the submit button and focus it
        const submitBtn = interactableElements.find(
          (el) => el.tagName === "BUTTON" && (el as HTMLButtonElement).type === "submit"
        );
        if (submitBtn) {
          submitBtn.focus();
        }
      }
    }
  }, []);

  return { handleKeyDown };
}
