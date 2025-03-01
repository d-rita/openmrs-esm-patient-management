import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { openmrsFetch } from '@openmrs/esm-framework';
import { mockAppointmentMetrics, mockProvidersCount, mockStartTime } from '../../../../__mocks__/appointments.mock';
import AppointmentsMetrics from './appointments-metrics.component';

const mockedOpenmrsFetch = openmrsFetch as jest.Mock;

jest.mock('../hooks/useClinicalMetrics', () => {
  const originalModule = jest.requireActual('../hooks/useClinicalMetrics.tsx');

  return {
    ...originalModule,
    useClinicalMetrics: jest.fn().mockImplementation(() => ({
      highestServiceLoad: mockAppointmentMetrics.highestServiceLoad,
      isLoading: mockAppointmentMetrics.isLoading,
      error: mockAppointmentMetrics.error,
    })),
    useAllAppointmentsByDate: jest.fn().mockImplementation(() => ({
      totalProviders: mockProvidersCount.totalProviders,
      isLoading: mockProvidersCount.isLoading,
      error: mockProvidersCount.error,
    })),
    useScheduledAppointment: jest.fn().mockImplementation(() => ({
      totalScheduledAppointments: mockAppointmentMetrics.totalAppointments,
    })),
    useAppointmentDate: jest.fn().mockImplementation(() => ({
      startDate: mockStartTime.startTime,
    })),
  };
});

describe('Appointment metrics', () => {
  it('renders metrics from appointment list', async () => {
    mockedOpenmrsFetch.mockResolvedValue({ data: [] });

    renderAppointmentMetrics();

    await waitFor(() => expect(screen.getByText(/appointment metrics/i)).toBeInTheDocument());
    expect(screen.getByText(/scheduled appointments/i)).toBeInTheDocument();
    expect(screen.getByText(/patients/i)).toBeInTheDocument();
    expect(screen.getByText(/16/i)).toBeInTheDocument();
    expect(screen.getByText(/4/i)).toBeInTheDocument();
  });
});

function renderAppointmentMetrics() {
  render(<AppointmentsMetrics serviceUuid="uuid" />);
}
