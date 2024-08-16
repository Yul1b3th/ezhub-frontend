import { computed, Injectable, signal } from '@angular/core';

interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSignal = signal<Notification | null>(null);

  // Señales computadas
  public notification = computed(() => this.notificationSignal()?.message);
  public type = computed(() => this.notificationSignal()?.type);

  showNotification(message: string, type: 'success' | 'error' | 'info') {
    // console.log('showNotification');
    // console.log(type);
    this.notificationSignal.set({ message, type });
  }

  clearNotification() {
    this.notificationSignal.set(null);
  }
}
