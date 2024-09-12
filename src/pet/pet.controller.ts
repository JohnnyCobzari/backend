import { Controller,Get, Post, Body,Param, Put, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './schemas/pet.schema'
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('pets')
export class PetController {
    constructor(private petService: PetService) {}

      @Get()  
      @UseGuards(AuthGuard('jwt'))
      async getAllPets(@Query('userId') userId?: string){
        const allPets = await this.petService.findAll();
    let userPets = [];

    if (userId) {
      userPets = await this.petService.findPetsByUser(userId);
    }

    // Return both results in the response
    return {
      allPets,
      userPets,
    };
    }
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createPet(
        @Body()
        pet: CreatePetDto,
        @Req() req

    ): Promise<Pet> {
        console.log("createPet endpoint reached");  // Add this to ensure the route is hit
        console.log("Request user:", req.user);  // Check if the user data is coming in
        
        console.log(req.user);
        return this.petService.create(pet, req.user);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))  
    async getPet(
        @Param('id')
        id:string
    ): Promise<Pet>{
      return this.petService.findById(id);
    }
   
    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async updatePet(
        @Param('id')
        id:string,
        @Body()
        pet: UpdatePetDto,
    ): Promise<Pet> {
        return this.petService.updateById(id, pet);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deletePet(
        @Param('id')
        id:string,
        
    ): Promise<Pet> {
        return this.petService.deleteById(id);
    }
}
