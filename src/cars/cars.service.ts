import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car-dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        /* {
            id: uuid(),
            brand: 'Ford',
            model: 'Fiesta'
        } */
    ]

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {

        const car = this.cars.find(car => car.id === id);

        if(!car) throw new NotFoundException(`Car with id ${id} not found`);

        return car;
    }

    create(CreateCarDto: CreateCarDto) {

        const newCar: Car = {
            id: uuid(),
            ...CreateCarDto
        }

        this.cars.push(newCar);

        return newCar;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
            
            let carDB = this.findOneById(id);

            if(updateCarDto.id && updateCarDto.id !== id) {
                throw new NotFoundException(`Car with id ${id} not found`);
            }

            this.cars = this.cars.map(car => {
                if(car.id === id) {
                    carDB = {
                        ...carDB,
                        ...updateCarDto,
                        id
                    }
                    return carDB;
                }
                return car;
            });
    
            return carDB;
    }

    delete(id: string) {

        const car = this.findOneById(id);

        this.cars = this.cars.filter(car => car.id !== id);

        return {
            message: `Car with id ${id} deleted`
        }
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }
}
