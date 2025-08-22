import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { ProdutoEntity } from "./produto.entity";

@Entity({ name: 'produto_imagens' })
export class ProdutoImagemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ name: "url", length: 100, nullable: false })
    url: string;
    @Column({ name: "nome", length: 100, nullable: false })
    descricao: string;

    @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristicas,
        {
            orphanedRowAction: 'delete',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })
    produto: ProdutoEntity;
}