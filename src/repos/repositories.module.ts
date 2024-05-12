import { Module } from '@nestjs/common';

const Repositories = [
    
]

@Module({
    imports: [],
    providers: Repositories,
    exports: Repositories
})
export class RepositoriesModule{}