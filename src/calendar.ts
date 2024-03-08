class Calendar {
  private currentDate: Date;
  public selectedDate: Date;
  private calendarElement: HTMLDivElement;

  constructor() {
    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.calendarElement = document.getElementById(
      "calendar"
    )! as HTMLDivElement;

    this.render();
  }

  private renderHeader(): HTMLDivElement {
    const header = document.createElement("div");
    header.className = "calendar-header";

    const prevButton = this.createButton("◀", () => this.updateMonth(-1));
    const nextButton = this.createButton("▶", () => this.updateMonth(1));

    const title = document.createElement("span");
    title.textContent = `${this.currentDate.toLocaleString("default", {
      month: "long",
    })} ${this.currentDate.getFullYear()}`;

    header.appendChild(prevButton);
    header.appendChild(title);
    header.appendChild(nextButton);

    return header;
  }

  private createButton(text: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  }

  private updateMonth(monthOffset: number): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + monthOffset);
    this.render();
  }

  private renderDays(): HTMLDivElement {
    const daysContainer = document.createElement("div");
    daysContainer.className = "calendar-days";

    days.forEach((day) => {
      const dayElement = document.createElement("div");
      dayElement.className = "day";
      dayElement.textContent = day;
      daysContainer.appendChild(dayElement);
    });

    return daysContainer;
  }

  private renderMonth(): HTMLDivElement {
    const firstDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const startingDay = firstDayOfMonth.getDay();
    const lastDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    const today = new Date();

    const totalDaysInPrevMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      0
    ).getDate();

    const daysInPrevMonth = totalDaysInPrevMonth - startingDay + 1;

    const monthContainer = document.createElement("div");
    monthContainer.className = "calendar-days";

    for (let i = 0; i < startingDay; i++) {
      const dayElement = this.createDayElement(
        daysInPrevMonth + i,
        today,
        true
      );
      monthContainer.appendChild(dayElement);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const dayElement = this.createDayElement(i, today);
      monthContainer.appendChild(dayElement);
    }

    const daysInNextMonth = 6 - lastDayOfMonth.getDay();
    for (let i = 1; i <= daysInNextMonth; i++) {
      const dayElement = this.createDayElement(i, today, false, true);
      monthContainer.appendChild(dayElement);
    }
    return monthContainer;
  }

  private createDayElement(
    day: number,
    today: Date,
    isPrevMonth: boolean = false,
    isNextMonth: boolean = false
  ): HTMLDivElement {
    const dayElement = document.createElement("div");
    dayElement.className = "day";
    dayElement.textContent = day.toString();

    if (isPrevMonth) {
      dayElement.classList.add("prev-month");
      dayElement.addEventListener("click", () => {
        this.updateMonth(-1);
      });
    }

    if (isNextMonth) {
      dayElement.classList.add("next-month");
      dayElement.addEventListener("click", () => {
        this.updateMonth(1);
      });
    }

    if (
      this.isToday(today, day) &&
      !dayElement.classList.contains("prev-month") &&
      !dayElement.classList.contains("next-month")
    ) {
      dayElement.classList.add("today");
    }

    if (
      this.isSelectedDate(day) &&
      !dayElement.classList.contains("prev-month") &&
      !dayElement.classList.contains("next-month")
    ) {
      dayElement.classList.add("selected");
    }

    dayElement.addEventListener("click", () => {
      this.selectedDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        day
      );
      this.render();
    });

    return dayElement;
  }

  private isToday(today: Date, day: number): boolean {
    return (
      day === today.getDate() &&
      this.currentDate.getMonth() === today.getMonth() &&
      this.currentDate.getFullYear() === today.getFullYear()
    );
  }

  private isSelectedDate(day: number): boolean {
    return (
      day === this.selectedDate.getDate() &&
      this.currentDate.getMonth() === this.selectedDate.getMonth() &&
      this.currentDate.getFullYear() === this.selectedDate.getFullYear()
    );
  }

  private render(): void {
    this.calendarElement.innerHTML = "";
    this.calendarElement.appendChild(this.renderHeader());
    const today = new Date();
    this.calendarElement.appendChild(this.renderDays());
    this.calendarElement.appendChild(this.renderMonth());
  }
}

const dayCells = document.querySelectorAll(".day");
dayCells.forEach((dayCell) => {
  dayCell.addEventListener("click", () => {
    console.log("dayCell clicked");
  });
});

const calendar = new Calendar();
