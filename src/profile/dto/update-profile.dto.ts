import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDTO } from './create-profile.dto'; // Adjust path as needed

export class UpdateProfileDTO extends PartialType(CreateProfileDTO) {}