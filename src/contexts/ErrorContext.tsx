import { createContext } from 'react';
import type { ErrorContextType } from '../types/error.types';

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);
