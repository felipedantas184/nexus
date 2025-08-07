type Student = {
  id: string;
  name: string;
  parent: string,
  imageUrl?: string,
  email?: string;
  birthday?: string;
  cpf?: string;
  phone?: string;
  school: string;
  grade: string;
  origin: 'particular' | 'fracta';
  diagnosis?: string[]; // pode conter múltiplos diagnósticos
  medicalInfo?: {
    medications?: string[];
    observations?: string;
  };
  address?: {
    zipCode: string;
    district: string;
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
  };
};


type Monitor = {
  id: string,
  name: string,
  email: string,
  birthday: string,
  cpf: string,
  phone: string,
  type: string,
  address: {
    zipCode: string,
    district: string,
    street: string,
    number: string,
    complement?: string,
    city: string,
    state: string,
  }
}

type Psychologist = {
  id: string,
  name: string,
  email: string,
  birthday: string,
  cpf: string,
  phone: string,
  type: string,
  address: {
    zipCode: string,
    district: string,
    street: string,
    number: string,
    complement?: string,
    city: string,
    state: string,
  }
}

type Psychiatrist = {
  id: string,
  name: string,
  email: string,
  birthday: string,
  cpf: string,
  phone: string,
  type: string,
  address: {
    zipCode: string,
    district: string,
    street: string,
    number: string,
    complement?: string,
    city: string,
    state: string,
  }
}

type Note = {
  id: string,
  text: string,
  timeStamp: string,
  studentId: string,
  psychologistId?: string,
  psychiatristId?: string,
  monitorId?: string,
  authorType: 'monitor' | 'psychologist' | 'psychiatrist',
  authorName: string,
}

export type {
  Student,
  Monitor,
  Psychologist,
  Psychiatrist,
  Note
}